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
    <script defer src="../script/dom.js"></script>
    <script defer src="../script/script.js"></script>
    <title>IGE</title>
</head>
<body>
    <div id="msg">Successful</div>
    <nav>
        <h3>Welcom to duty</h3>
        <div id="logout">
            <b>log out</b>
        </div>
    </nav>
    <div class="wrapper">

        <div class="container">
            <div id="edit-me">
                <div>
                    <label for="name">
                        <b>Product :</b>
                        <input type="text" id="product" class="input" placeholder="product">
                    </label>
                    <label for="date">
                        <b>Date :</b>
                        <div>
                            <input type="number" min="1" max="31" id="date" class="input" placeholder="dd">
                            <input type="number" min="1" max="12" id="date-m" class="input" placeholder="mm">
                            <input type="number" min="2000" id="date-y" class="input" placeholder="yyyy">
                        </div>
                    </label>
                </div>
                <div>
                    <label for="quantity">
                        <b>Quantity :</b>
                        <input type="number" min="0" id="quantity" class="input" placeholder="quantity">
                    </label>

                    <label for="price">
                        <b>Price :</b>
                        <input type="number" min="0" id="price" class="input" placeholder="price">
                    </label>
                </div>
                <div>
                    <label for="mark">
                        <b>Mark :</b>
                        <select name="mark" id="mark" class="dropdown">
                            <?php 
                                foreach ($markData as $key) 
                                    echo "<option value=\"$key[0]\">$key[0] </option>";
                            ?>
                        </select>
                    </label>
                    
                    <label for="category">
                        <b>Category :</b>
                        <select name="category" id="category" class="dropdown">
                            <?php 
                                foreach ($categData as $key) 
                                    echo "<option value=\"$key[0]\">$key[0] </option>";
                            ?>
                        </select>
                    </label>
                </div>
            </div>
            <div class="container-btn">
                    <label class="btn-cont" for="addCat">
                        <i id="addCat" style="color: #7d7c77; text-decoration: underline;">
                            New Category/Mark
                        </i>
                    </label>
                    <label class="btn-cont" for="addBtn">
                        <button id="addBtn" class="small_btn add"></button>
                        <b style="color: #008cff;">Add</b>
                    </label>
                    <label class="btn-cont" for="editBtn">
                        <button id="editBtn" class="small_btn edit"></button>
                        <b style="color: #af52de;">Edit</b>
                    </label>
                    
            </div>
        </div>

        <div class="container" style="border:none;">
            <h1 class="head-text">Data & stuff :</h1>
            <div class="filter">
                <label for="search">
                    <span class="icon srch"></span>
                    <input type="text" id="search" class="input" placeholder="Search">
                    <span class="icon loading" id="loadingIC"></span>
                    <button class="button btn-srch" id="searchBtn"></button>
                </label>
                
                <div>
                    <div id="filtering">
                    
                        <label for="f">
                            <span class="icon small_btn" id="f" style="opacity: 1;"></span>
                        </label>
                        <label for="ff">
                            <span class="icon mark" id="ff"></span>
                        </label>
                        <label for="fff">
                            <span class="icon category" id="fff"></span>
                        </label>
                    </div>
                    <button class="action" id="selectAll">select all</button>
                    <button id="removeAll" class="small_btn bin"></button>
                </div>
            </div>
            <div style="min-height: 270px; width: 100%; overflow-x:auto;">
                <table class="table" id="data"> 
                    <thead>
                        <tr>
                            <th></th>
                            <th><span class="icon num"></span>rank</th>
                            <th><span class="icon"></span>product</th>
                            <th><span class="icon mark"></span>mark</th>
                            <th><span class="icon category"></span>category</th>
                            <th><span class="icon qte"></span>quantity</th>
                            <th><span class="icon price"></span>price</th>
                            <th><span class="icon calendar"></span>date</th>
                            <th><span class="icon op"></span>action</th>
                        </tr>
                    </thead>
                    <tbody id="tbody"> </tbody>
                </table>
            </div>
        </div>
        <div class="pagination">
            <button class="button" id="pgDw"><</button>
            <div id='numeros'> </div>
            <button class="button" id="pgUp">></button>
            
        </div>

    </div>
</body>
</html>