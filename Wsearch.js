function search(){
    var val = document.getElementById("searchbox").value
    alert(val);
	
	var dbConnection = SQL.connect( { Driver: "MySQL",
		Host: "localhost",
		Port: 3306,
	Database; "seniorProject" } );
	
	var sql = "SELECT CollectionTitle, SubjectHeadings, InclusiveDates, Institution
		FROM theW
}