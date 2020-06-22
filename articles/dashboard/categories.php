<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('../server/api.php'); ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../src/index.css">
    <script defer src="../script/jquery.js"></script>
    <script defer src="../script/messageBox.js"></script>
    <script defer src="../script/request.js"></script>
    <script defer src="../script/secondscript.js"></script>
    <title>Categ/Mark</title>
</head>
<body>
    <nav>
        <h3> <a href="./index.php"><span class="backwards"></span> HOME</a></h3>
        <div> <b id="logout">log out</b> </div>

    </nav>
    <div class="wrapper">
        <i id="err">deja exist</i>
        <div class="container">
            <h1 class="head-text">Mark : </h1>
            <div id="edit-me">
                <div class="d-block">
                    <div>
                        <label for="addMark">
                            <b>Mark :</b>
                            <input type="text" id="addMark" class="input" placeholder="Dell">
                        </label>

                        <label for="MarkCateg">
                            <b>Categrie :</b>
                            <select id="MarkCateg" class="dropdown" >
                            </select>
                        </label>

                    </div>
                    <div class="container-btn">
                        <button id="addMarkBtn" class="small_btn add"></button>
                        <button id="editMarkBtn" class="small_btn edit"></button>
                        <button id="deleteMarkBtn" class="small_btn bin"></button>
                    </div>
                </div>
                <div class="d-block">
                    <b> Marks in database :</b>
                    <select id="showMark" class="showCM" multiple>
                        <option value="x">1 DELL, Hardware</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="container" style="border:none;">
            <h1 class="head-text">Categories : </h1>
            <div id="edit-me">
                <div class="d-block">
                    <label for="addCategorie">
                        <b>Categorie :</b>
                        <input type="text" id="addCategorie" class="input" placeholder="Hardware">
                    </label>
                    <div class="container-btn">
                        <button id="addCatBtn" class="small_btn add"></button>
                        <button id="editCatBtn" class="small_btn edit"></button>
                        <button id="deleteCatBtn" class="small_btn bin"></button>
                    </div>
                </div>
                <div class="d-block">
                    <b> Categories in database :</b>
                    <select id="showCateg" class="showCM" multiple>
                    </select>
                </div>
            </div>
        </div>

       

    </div>
</body>
</html>