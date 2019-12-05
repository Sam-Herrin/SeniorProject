<?php

$val = $_REQUEST["q"];
$cat = $_REQUEST["cat"];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM msstate WHERE " . $cat . " LIKE '%" . $val . "%';";
$result = $conn->query($query);
if(!$result){
    echo "<h2 style='text-align:center;'>No Results Matching Search<h2>";
}

if(mysqli_num_rows($result) != 0){
    echo "<table id='MSUTable' style='width: 100%; text-align: center; margin-left: auto; margin-right: auto'>
    <tr style='font-size: 30px'>
        <style>th: {max-width: 250px}</style>

        <th style='width: 5%;'>ID</th>
        <th style='width: 35%;'>Manuscript Name</th>
        <th style='width: 25%;'>Library Name</th>
        <th style='width: 15%;'>Author</th>
        <th style='width: 20%;'>Country</th>
    </tr>";

    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        
        if($row['BirthDate'] == NULL){
            $BD = 'Unknown';
        }else{
            $BD = $row['BirthDate'];
        }
        if($row['DeathDate'] == NULL){
            $DD = 'Unknown';
        }else{
            $DD = $row['DeathDate'];
        }
        if($row['Website'] == NULL){
            $web = 'None';
        }else{
            $web = $row['Website'];
        }
        
        echo "
        <tr style='height: 75px;'>
            <td>" . $row['ID'] . "</td>
            <td style='padding: 15px'>" . $row['ManuscriptName'] . "</td>
            <td>" . $row['LibraryName'] . "</td>
            <td>" . $row['Author'] . "</td>
            <td>" . $row['Country'] . "</td>
        </tr>
        ";

    }
    echo "</table>";
}else{
    echo "<br><h2 style='text-align:center;'>No Results Matching Search<h2>";
}
?>