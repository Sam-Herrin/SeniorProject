function search(){
    var val = document.getElementById("SearchDB").value;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            alert(this.responseText);
        }
    };
    req.open("GET", "php/msstateSearch.php?q=" + val, true);
    req.send();
}