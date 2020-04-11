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

function advSearch(){
    var val1 = sessionStorage.getItem("name");
    var val2 = sessionStorage.getItem("inst");
    var val3 = sessionStorage.getItem("subhead");

    if(val1 == null && val2 == null && val3 == null){
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("resultsTable").innerHTML = this.responseText
                addRowHandlers();
            }
        };
        req.open("GET", "http://localhost/seniorproject/php/AdvancedSearch.php?q=&r=&s=", true);
        req.send();
    }else{
        document.getElementById("CollectionTitle").value = val1;
        document.getElementById("Institution").value = val2;
        document.getElementById("SubjectHeadings").value = val3;

        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                document.getElementById("resultsTable").innerHTML = this.responseText
                addRowHandlers();
            }
        };
        req.open("GET", "http://localhost/seniorproject/php/AdvancedSearch.php?q=" + val1 + "&r=" + val2 + "&s=" + val3 , true);
        req.send();
    }
}

function advRedir(){
    sessionStorage.setItem("name", document.getElementById("CollectionTitle").value);
    sessionStorage.setItem("inst", document.getElementById("Institution").value);
    sessionStorage.setItem("subhead", document.getElementById("SubjectHeadings").value);
    window.location = "http://localhost/seniorproject/AdvancedSearch.html";
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