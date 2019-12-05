<?php

$record = $_REQUEST['q'];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM msstate WHERE ID = '" . $record . "';";
$result = $conn->query($query);
if(!$result){
    echo "<h2 style='text-align:center;'>No Results Matching Search<h2>";
}

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$name = $row['ManuscriptName'];

$query = "SELECT * FROM msstate WHERE ManuscriptName = '" . $name . "' EXCEPT SELECT * FROM msstate WHERE ID = '" . $record . "';";
$results = $conn->query($query);

if(mysqli_num_rows($results) == 0){
    echo "<p>No other Instances</p>";
}else{
    while($rows = mysqli_fetch_array($results, MYSQLI_ASSOC)){
        echo "
            <p onclick='showDetails(" . $rows['ID'] . ")'>" . $rows['ID'] . ". " . $rows['City'] . ", " . $rows['Country'] . "</p>
        ";
    }
}

?>