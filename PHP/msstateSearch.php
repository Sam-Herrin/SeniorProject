<?php

$val = $_REQUEST["q"];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM msstate WHERE ManuscriptName LIKE '%" . $val . "%';";
$result = $conn->query($query);
if(!$result){
    echo "<h2 style='text-align:center;'>No Results Matching Search<h2>";
}

if(mysqli_num_rows($result) != 0){
    echo "<table id='MSUTable' style='width: 100%; text-align: center; margin-left: auto; margin-right: auto'>
    <tr style='font-size: 30px'>
        <th>Manuscript Name</th>
        <th>Library Name</th>
        <th>Author</th>
        <th>Original or Copy</th>
    </tr>";
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){

    }
}else{
    echo "<br><h2 style='text-align:center;'>No Results Matching Search<h2>";
}
?>