<?php

$email = $_REQUEST["q"];
$pass = $_REQUEST["r"];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT * FROM msuUser WHERE Email = '$email' AND Authorized = '1';";
$result = $conn->query($query);


if(!$result){
    echo("false");
}else if(mysqli_num_rows($result) > 1){
    echo("Error");
}else{
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){

        $enPass = $row["Pass"];

        if(password_verify($pass, $enPass)){
            if($row["isAdmin"] == 1){
                echo("Password Match1");
            }elseif($row["isAdmin"] == 0){
                echo("Password Match0");
            }

        }else{
            echo("false");
        }
    }
}
?>