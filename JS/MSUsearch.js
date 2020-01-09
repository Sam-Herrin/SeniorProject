function search(){
    var val = sessionStorage.getItem("searchQ");
    var cat = sessionStorage.getItem("searchCat");
    if(cat != null){
        document.getElementById(cat).selected = true;
    }else{
        cat = "ManuscriptName";
    }
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
    req.open("GET", "php/msstateSearch.php?q=" + val + "&cat=" + cat, true);
    req.send();
}

function FreshSearch(){
    sessionStorage.clear("searchQ");
    sessionStorage.clear("searchCat");
    window.location = "http://localhost/seniorproject/browse.html";
}

function MSURedir(){
    sessionStorage.setItem("searchQ", document.getElementById("SearchDB").value);
    sessionStorage.setItem("searchCat", document.getElementById("category").value);
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
    sessionStorage.setItem("msuColumn",column);
    window.location = "http://localhost/seniorproject/MSUdetails.html";
}

function viewDetails(){
    var val = sessionStorage.getItem("searchQ");
    var cat = sessionStorage.getItem("searchCat");
    document.getElementById("SearchDB").value = val;
    if(cat != null){
        document.getElementById(cat).selected = true;
    }else{
        cat = "ManuscriptName";
    }
    if(sessionStorage.getItem("msuColumn") != null){
        var record = sessionStorage.getItem("msuColumn");
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("details").innerHTML = this.responseText;
            }
        };
        req.open("GET", "php/showMSUDetails.php?q=" + record, true);
        req.send();
    }else{
        document.getElementById("details").innerHTML = "<h2>Error: Please go back</h2>"
    }
}

function otherCopies(){
    var record = sessionStorage.getItem("msuColumn");
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("otherCopies").innerHTML = this.responseText;
            }
        };
        req.open("GET", "php/otherCopies.php?q=" + record, true);
        req.send();
}