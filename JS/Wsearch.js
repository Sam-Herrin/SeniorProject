function search(){
    var val = document.getElementById("searchbox").value;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            alert(this.responseText);
        }
    };
    req.open("GET", "http://localhost/seniorproject/php/theWSearch.php?q=" + val, true);
    req.send();
}