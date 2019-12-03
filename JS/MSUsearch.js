function search(){
    var val = localStorage.getItem("searchQ");
    if(val == null){
        val = "";
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("content-body").innerHTML = this.responseText
        }
    };
    req.open("GET", "php/msstateSearch.php?q=" + val, true);
    req.send();
}

function MSURedir(){
    localStorage.setItem("searchQ",document.getElementById("SearchDB").value);
    window.location = "http://localhost/seniorproject/browse.html";
}