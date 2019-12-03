<?php
$val = $_REQUEST["q"];
if($val == NULL){
    $val = "";
}

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM msstate WHERE ManuscriptName LIKE '%" . $val . "%';";
$result = $conn->query($query);
if(!$result){
    echo "<h2 style='text-align:center;'>No Results Matching Search<h2>";
}

if(mysqli_num_rows($result) != 0){
    echo "<table id='resTable' style='width: 80%; text-align: center; margin-left: auto; margin-right: auto'>
    <tr style='font-size: 32px'>
        <th>Manuscript Name</th>
        <th>Library Name</th>
        <th>Author</th>
        <th>Original or Copy</th>
    </tr>";
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        echo "";
    }
}
?>