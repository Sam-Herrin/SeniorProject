<?php

	$dbhost = "127.0.0.1";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "test";
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$username = $_POST['user'];
		$password = $_POST['pass'];
		$error = FALSE;
		
		if($conn)
		{
			$db = mysqli_select_db($conn, $dbname);
		
			if(!$db)
			{
				echo "Could not connect to database".mysqli_error($con);
			}
			else
			{
				$sql = "SELECT password FROM users WHERE username='".$username."'";
				$result = $conn->query($sql);
				if($result->num_rows > 0)
				{
					while($row = $result->fetch_assoc())
					{
						$password_hashed = password_hash($password, PASSWORD_DEFAULT);
						if(password_verify($password, $row["password"]))
						{
							header("location: msstateDrupal.html");
						}
					}
				}
				else
				{
					echo "incorrect username or password!<br>";
					echo "<a href='login.html'>Click here to return to login</a>";
				}
			}
		}
	}
	$conn->close();
?>
