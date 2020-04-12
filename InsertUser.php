<html>
<body>

<?php

	$dbhost = "127.0.0.1";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "test";
	$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
	
	$username = "";
	$password = "";
	$confirm = "";
	$email = "";
	$institution = "";
	
	$no_username = FALSE;
	$no_password = FALSE;
	$no_confirm = FALSE;
	$no_password_match = FALSE;
	$no_email = FALSE;
	$invalid_email = FALSE;
	$no_institution = FALSE;
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{	
		if(empty($_POST['user']))
		{
			$no_username = TRUE;
		}
		else
		{
			$username = $_POST['user'];
		}

		if(empty($_POST['pass']))
		{
			$no_password = TRUE;
		}
		else
		{
			$password = $_POST['pass'];
		}
		
		if(empty($_POST['confirmPass']))
		{
			$no_confirm = TRUE;
		}
		else
		{
			$confirm = $_POST['confirmPass'];
		}
		
		if(empty($_POST['userEmail']))
		{
			$no_email = TRUE;
		}
		else
		{
			if(!filter_var($_POST['userEmail'], FILTER_VALIDATE_EMAIL))
			{
				$invalid_email = TRUE;
			}
			else
			{
				$email = $_POST['userEmail'];
			}
		}
		
		if(empty($_POST['userUni']))
		{
			$no_institution = TRUE;
		}
		else
		{
			$institution = $_POST['userUni'];
		}
		
		if(!empty($password) && !empty($confirm))
		{
			if(strcasecmp($password, $confirm) != 0)
			{
				$no_password_match = TRUE;
			}
		}
	}
	
	if($no_username == TRUE || $no_password == TRUE || $no_confirm == TRUE || $no_password_match == TRUE || $no_email == TRUE || $invalid_email == TRUE || $no_institution == TRUE)
	{
		if($no_username == TRUE)
		{
			echo "Please enter a username!<br>";
		}
		if($no_password == TRUE)
		{
			echo "Please enter a password!<br>";
		}
		if($no_confirm == TRUE)
		{
			echo "Please enter your password again!<br>";
		}
		if($no_password_match == TRUE)
		{
			echo "Please make sure your passwords match!<br>";
		}
		if($no_email == TRUE)
		{
			echo "Please enter an email!<br>";
		}
		if($invalid_email == TRUE)
		{
			echo "Please enter a valid email!<br>";
		}
		if($no_institution == TRUE)
		{
			echo "Please enter your institution!<br>";
		}
		echo "<a href='CreateUser.php'>Return</a>";
	}
	else
	{
		if($conn)
		{
			$db = mysqli_select_db($conn, $dbname);
		
			if(!$db)
			{
				echo "Could not connect to database".mysqli_error($con);
			}
			else
			{
				$password_hashed = password_hash($password, PASSWORD_DEFAULT);
				$sql = "INSERT INTO users (username, password, email, institution, admin) VALUES ('".$username."', '".$password_hashed."', '".$email."', '".$institution."', '0')";
				$result = $conn->query($sql);
				echo "<p>Account Created!</p><br><a href='Login.html'>Return</a>";
			}
		}
	}
	$conn->close();
?>

</body>
</html>
