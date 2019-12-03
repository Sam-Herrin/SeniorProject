<?php

$val = $_REQUEST["q"];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM theW WHERE CollectionTitle LIKE '%" . $val . "%';";
$result = $conn->query($query);
if(!$result){
    echo "No Results Found";
}

if(mysqli_num_rows($result) != 0){
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        echo "
        <p>" . $row['CollectionTitle'] . "</p>
        <p>" . $row['Institution'] . "</p>
        <p>" . $row['InclusiveDates'] . "</p>";
    }
}else{
    echo "No Results Matching Search";
}
?>