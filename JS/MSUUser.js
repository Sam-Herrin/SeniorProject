function createUser(){
    var name = document.getElementById("name").value;
    var pass = document.getElementById("password").value;
    var confPass = document.getElementById("confirmPass").value;
    var email = document.getElementById("userEmail").value;
    var institution = document.getElementById("userInst").value;

    var alertmsg = regexCheck(name, pass, confPass, email, institution);

    if(alertmsg != false){
        alert(alertmsg);
    }else{
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                if(this.responseText == "false"){
                    alert("There is already an account with this email address. Please enter another.");
                }else if(this.responseText == "Error Inserting"){
                    alert("There was a problem creating the account. Please try again later.");
                }else{
                    alert("An administrator must now approve your account. You will now be redirected to the home page.");
                    window.location.assign("./msstateDrupal.html");
                }
            }
        };
        req.open("GET", "php/MSUCreateUser.php?q=" + name + "&r=" + pass + "&s=" + email + "&t=" + institution , true);
        req.send();
    }
}

function login(){
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            if(this.responseText == "false"){
                alert("Invalid Email or Password");
            }else if(this.responseText == "Error"){
                alert("Error Logging in. Please try again later.");
            }else if(this.responseText == "Password Match1"){
                document.cookie = "email=" + email + "; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
                document.cookie = "x=e9F7iK45E!; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/"
                window.location.assign("./msstateDrupal.html");
            }else if(this.responseText == "Password Match0"){
                var value = makeid();
                document.cookie = "email=" + email + "; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
                document.cookie = "x=" + value + "; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/";
                window.location.assign("./msstateDrupal.html");
            }else{
                alert("Invalid Email or Password");
            }
        }
    };
    req.open("GET", "php/MSULogin.php?q=" + email + "&r=" + pass, true);
    req.send();
}

function logout(){
    document.cookie = "email=; expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/";
    document.cookie = "x=; expires=Thu, 18 Dec 2010 12:00:00 UTC; path=/";
    window.location.assign("./msstateDrupal.html");
}

function loginSwap(){
    var test = document.cookie;
    var email = test.search("email=")
    if(email != -1){
        var x = test.search("x=");
        if(x != -1){
            document.getElementById("account").innerHTML ="<a href='./MSUAccountPage.html'>Account</a>";
        }
    }
}

function regexCheck(name, pass, confPass, email, institution){
    var errormsg = "";

    var namePat = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    var passPat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var emailPat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var instPat = /^(?!\s*$).+/g;

    if(namePat.test(name) == false){
        errormsg = "Name must be in the following format: John Doe.";
    }
    if(passPat.test(pass) == false){
        errormsg = errormsg + "\n" + "Password must have at least one uppercase character, one lowercase character, one number, and be at least 6 characters long.";
    }
    if(pass != confPass){
        errormsg = errormsg + "\n" + "Passwords must match."
    }
    if(emailPat.test(email) == false){
        errormsg = errormsg + "\n" + "Email must be in the following format: someone@example.com"
    }
    if(instPat.test(institution) == false){
        errormsg = errormsg + "\n" + "Must list an Institution you are associated with.";
    }

    if(errormsg == ""){
        return false;
    }else{
        return errormsg;
    }

}

function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }