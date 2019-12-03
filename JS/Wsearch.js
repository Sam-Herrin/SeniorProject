function search(){
    var val = localStorage.getItem("searchVal");
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            alert(this.responseText);
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWSearch.php?q=" + val, true);
    req.send();
}

function redir(){
    localStorage.setItem("searchVal", document.getElementById("searchbox").value);
    window.location = "http://localhost/seniorproject/Wresults.html";
}

window.onload = function(){

    this.search();

}