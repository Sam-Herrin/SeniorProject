<?php

$name = $_REQUEST["q"];
$pass = $_REQUEST["r"];
$email = $_REQUEST["s"];
$inst = $_REQUEST["t"];

$conn = new mysqli("localhost", "root", "", "seniorProject");

$query = "SELECT ID FROM WUser ORDER BY ID DESC LIMIT 0, 1;";
$result = $conn->query($query);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $next = $row["ID"] + 1;
}

$encryptPass = password_hash($pass, PASSWORD_DEFAULT);

$query = "SELECT * FROM WUser WHERE Email = '" . $email . "';";
$result = $conn->query($query);

while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $eEmail = $row["Email"];
}

if($email == $eEmail){
    echo("false");
}else{
    $add = "INSERT INTO WUser(ID, Username, Pass, Email, Institution, isAdmin, Authorized) VALUES('$next', '$name', '$encryptPass', '$email', '$inst', '0', '0')";
    if ($conn->query($add) === TRUE) {
        echo "Inserted";
    } else {
        echo "Error Inserting";
    }
}

?>