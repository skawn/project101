<?php 
	include('connect.php');
	session_start();
	
	if (isset($_POST["action"]) && !empty($_POST["action"])){
		getData($_POST["action"]);
	}

	function getData($param){			
		switch ($param) {
			case 'getAll': getAll(); break;		
			case 'Add': add(); break;
			case 'Edit': update(); break;
			case 'Delete': delete(); break;
			case 'Search': Search(); break;
			case 'Pagin': getCount(); break;
			case 'insertGM': addCatMark(); break;
			case 'editGM': editCatMark(); break;
			case 'deleteGM': DeleteCatMark(); break;
			case 'Login': Login(); break;
			case 'Logout': Logout(); break;
			case 'getSecond': echo json_encode(getCatMark(`categorie`));break;
		} 
	}

	/* first Admin page work */

	function returnVals($method){
		try{
			$idArt = $_POST["IDArticle"];
			$lib = $_POST["Libele"];
			$qte = $_POST["Qte"];
			$cat = $_POST["NomCategorie"];
			$comp = $_POST["NomCompagne"];
			$prix = $_POST["Prix"];
			$ech = date('Y-m-d',strtotime($_POST["Echeance"]));

			if($method == 'add') 
				return Array($lib,$ech,$qte,$cat,$comp,$prix);
			if($method == 'edit') 
				return Array($lib,$ech,$qte,$cat,$comp,$prix,$idArt);
			if($method == 'delete') 
				return Array($idArt);
			if($method == 'search') 
				return Array($argum,$sVal);
			
		}catch(Exception $e){ echo $e->getMessage(); }
		
	}

	function getCount(){
		GLOBAL $con;
		$st=$con->prepare("SELECT COUNT(*) FROM `article`");
		$st->execute();
		$all = $st->fetchAll();
		echo json_encode($all);
	}

	function getAll(){
		if(checkAuthorization()){
			GLOBAL $con;
			$idGet = $_POST["idGet"];
			$limit = $_POST["limit"];
	
			$st=$con->prepare("SELECT * FROM article ORDER BY IdArticle ASC LIMIT $idGet,$limit");	
	
			//changed this part
			if($st->execute()){
				$all = $st->fetchAll();
				echo json_encode($all);
			}
		}
	}

	function Search(){
		if(checkAuthorization()){
			GLOBAL $con;
			$argum = $_POST["argum"];
			$sVal = $_POST["searchValue"];
			if(!empty($argum) && !empty($sVal)){
				$st=$con->prepare("SELECT * FROM article where $argum LIKE '%$sVal%'");
				if($st->execute()){
					$all = $st->fetchAll();
					echo json_encode($all);
				}
			}
		}
	}

	function add(){
		if(checkAuthorization()){
			GLOBAL $con;
			$st=$con->prepare("
			INSERT INTO article (`Libele`, `Echeance`, `Qte`, `NomCategorie`, `NomCompagne`, `Prix`) VALUES (?,?,?,?,?,?)");
			if($st->execute( returnVals('add') )){
				echo '{"msg":"Added successfully","i":"1"}';
				exit();
			}else echo '{"msg":"Something went wrong while adding","i":"0"}';
		}
	}

	function update(){
		if(checkAuthorization()){
			GLOBAL $con;
			$st=$con->prepare("
			UPDATE article SET Libele=?, Echeance=?, Qte=?, NomCategorie=?, NomCompagne=?, Prix=? where IdArticle=?");
			if($st->execute( returnVals('edit') )){
				echo '{"msg":"Updated successfully","i":"1"}';
				exit();
			}else echo '{"msg":"Something went wrong while updating","i":"0"}';
		}
	}

	function delete(){
		if(checkAuthorization()){
			GLOBAL $con;
			//$st=$con->prepare(" DELETE FROM article where IdArticle = (?)");
			$ids = $_POST['IDArticle'];
			if(!empty($ids)){
				if (is_array($ids)) $ids = implode(', ', $ids);
	
				$st=$con->prepare(" DELETE FROM article where IdArticle IN ($ids)");
				$st->execute();
	
				echo '{"msg":"Deleted successfully","i":"1"}';
				exit();
			}else echo '{"msg":"Something went wrong while deleting","i":"0"}';
		}
	}

	function getCatMark($table){
		if(checkAuthorization()){
			GLOBAL $con;
			if($table == 0 && !empty($_POST["tableName"])) 
				$table = $_POST["tableName"];		
			$st=$con->prepare("SELECT * FROM $table");
			$st->execute();
			return $all = $st->fetchAll();
		}
	}

	$categData =  getCatMark("`categorie`");
	$markData =  getCatMark("`compagne`");

	/* second Admin page work */

	function checkCarMark($key, $_item, $index = 0){
		GLOBAL $con;
		$available = false;
		if($key) $st=$con->prepare("SELECT * FROM compagne");
		else $st=$con->prepare("SELECT * FROM categorie");
		
		$st->execute();
		$all = $st->fetchAll();

		foreach ($all as $item) 
			if(strtolower($item[$index]) == strtolower($_item)){ $available = true; break; }
		return $available;
	}

	function addCatMark(){
		if(checkAuthorization()){
			GLOBAL $con;
			$_query = '';
			$Arr = [];
			$category = $_POST["_categ"];
			$item_exist = false;
	
			if(empty($_POST["_mark"])) {
				$item_exist = checkCarMark(0,$category);
				$Arr = Array($category);
				$_query = "INSERT INTO categorie (`NomCategorie`) VALUES (?)";
			}else{
				$mark = $_POST["_mark"];
				$item_exist = checkCarMark(1,$mark);
				$Arr = Array($mark, $category);
				$_query = "INSERT INTO compagne (`NomCompagne`, `NomCategorie`) VALUES (?,?)";
			}
			if($item_exist == false){
				$st=$con->prepare($_query);
				if($st->execute($Arr)) echo 1;
				exit();
			}else echo 0;
		}
	}

	function editCatMark(){
		if(checkAuthorization()){
			GLOBAL $con;
			$_query = '';
			$Arr = [];
			$category = $_POST["_categ"];
			$_value = $_POST["_baseValue"];
	
			if(empty($_POST["_mark"])) {
				if( checkCarMark(1, $category ,1) ){
					$Arr = Array($category, $category, $_value, $_value);
					$_query = "UPDATE categorie ca, compagne c SET ca.`NomCategorie` = ?, c.`NomCategorie` = ? where ca.`NomCategorie` = ? and c.`NomCategorie` = ?";
				}else{
					$Arr = Array($category, $_value);
					$_query = "UPDATE categorie SET `NomCategorie` = ? where `NomCategorie` = ? ";
				}
			}else{
				$mark = $_POST["_mark"];
				$Arr = Array($mark, $category, $_value);
				$_query = "UPDATE compagne SET `NomCompagne` = ?, `NomCategorie` = ? where `NomCompagne` = ?";
			}
	
			$st=$con->prepare($_query);
			if($st->execute($Arr)){
				echo '{"msg":"Edited successfully","i":"1"}';
			}else 
				echo '{"msg":"Edit Error!","i":"0"}';
			exit();
		}
	}

	function DeleteCatMark(){
		if(checkAuthorization()){
			GLOBAL $con;
			$_query = '';
			$Arr = [];
	
			if(empty($_POST["_mark"])) {
				$category = $_POST["_categ"];
				if( checkCarMark(1, $category ,1) ){
					$Arr = Array($category, $category);
					$_query = "DELETE c, ca FROM compagne c, categorie ca  WHERE ca.`NomCategorie` = ? AND c.`NomCategorie` = ? ";
				}else {
					$Arr = Array($category);
					$_query = "DELETE FROM categorie WHERE `NomCategorie` = ? ";
				}
			}else{
				$mark = $_POST["_mark"];
				$Arr = Array($mark);
				$_query = "DELETE FROM compagne where `NomCompagne` = ?";
			}
	
			$st=$con->prepare($_query);
			if($st->execute($Arr)) echo 'deleted';
			else echo 'error';

			exit();
		}
	}

	/* Authorization */

	function Login(){
		$email = $_POST["user"];	
		$password = $_POST["pass"];

		if (isset($email) && !empty($email) && isset($password) && !empty($password)) {
			GLOBAL $con;
			$st=$con->prepare("SELECT id,email FROM users WHERE email=? AND password=?");
			$st->execute(array($email, sha1($password)));
			$all=$st->fetchAll();

			if (count($all) == 1){
				echo '{"msg":"log in!","i":"1"}';
				$_SESSION["login"] = $all[0]["id"];
			}else echo '{"msg":"Invalid email or password!","i":"0"}';
			exit();
		}
	}

	function Logout(){
		session_unset(); //remove all session variables
		session_destroy(); //destroy the session
		checkAuthorization();
	}

	function checkAuthorization(){
		if(!isset($_SESSION["login"])){
			echo "denied";  exit();
			return 0;
		}else return 1;
	}

?>
