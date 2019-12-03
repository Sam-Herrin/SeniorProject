function search(){
    var val = localStorage.getItem("searchVal");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("searchbox").value = val;
            document.getElementById("resultsTable").innerHTML = this.responseText
            addRowHandlers();
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWSearch.php?q=" + val, true);
    req.send();
}

function redir(){
    localStorage.setItem("searchVal", document.getElementById("searchbox").value);
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
    localStorage.setItem("item", collTitle);
    window.location = "http://localhost/seniorproject/Wdetails.html";
}

function displayDetails(){
    var record = localStorage.getItem("item");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("details").innerHTML = this.responseText;
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWDetails.php?q=" + record, true);
    req.send();
}