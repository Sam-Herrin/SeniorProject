function search(){
    var val = sessionStorage.getItem("searchVal");
    var cat = sessionStorage.getItem("category");
    document.getElementById("searchbox").value = val;
    document.getElementById(cat).selected = true;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("resultsTable").innerHTML = this.responseText
            addRowHandlers();
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWSearch.php?q=" + val + "&cat=" + cat, true);
    req.send();
}

function redir(){
    sessionStorage.setItem("searchVal", document.getElementById("searchbox").value);
    sessionStorage.setItem("category", document.getElementById("category").value);
    window.location = "http://localhost/seniorproject/Wresults.html";
}

function addRowHandlers() {
    var row = document.getElementById("resTable").rows;
    for (i = 0; i < row.length; i++) {
        row[i].onclick = function(){ return function(){
            var slot = this.cells[0];
            viewDetails(slot.innerHTML);
        };}(row[i]);
    }
}

function viewDetails(collTitle){
    sessionStorage.setItem("item", collTitle);
    window.location = "http://localhost/seniorproject/Wdetails.html";
}

function displayDetails(){
    var record = sessionStorage.getItem("item");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("details").innerHTML = this.responseText;
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWDetails.php?q=" + record, true);
    req.send();
}