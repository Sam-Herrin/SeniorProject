function search(){
    var val = localStorage.getItem("searchQ");
 document.getElementById("SearchDB").value = val;
    if(val == null){
        val = "";
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
         document.getElementById("content-body").innerHTML = this.responseText
            addRowHandlers();
        }
    };
    req.open("GET", "php/msstateSearch.php?q=" + val, true);
    req.send();
}

function FreshSearch(){
    localStorage.clear("searchQ");
    window.location = "http://localhost/seniorproject/browse.html";
}

function MSURedir(){
    localStorage.setItem("searchQ", document.getElementById("SearchDB").value);
    window.location = "http://localhost/seniorproject/browse.html";
}

function addRowHandlers() {
    var row = document.getElementById("MSUTable").rows;
    for (i = 0; i < row.length; i++) {
        row[i].onclick = function(){ return function(){
            var slot = this.cells[0];
            showDetails(slot.innerHTML);
        };}(row[i]);
    }
}

function showDetails(column){
    localStorage.setItem("msuColumn",column);
    window.location = "http://localhost/seniorproject/MSUdetails.html";
}

function viewDetails(){
    var record = localStorage.getItem("msuColumn");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("details").innerHTML = this.responseText;
        }
    };
    req.open("GET", "php/showMSUDetails.php?q=" + record, true);
    req.send();
}