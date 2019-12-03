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
        <tr style='height: 100px'>
            <td>" . $row['CollectionTitle'] . "</td>
            <td>" . $row['Institution'] . "</td>
            <td>" . $row['InclusiveDates'] . "</td>
            <td>" . $row['SubjectHeadings'] . "</td>
        </tr>";
    }
}else{
    echo "No Results Matching Search";
}
?>