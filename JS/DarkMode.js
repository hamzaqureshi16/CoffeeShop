function Dark(btn){
    var element = document.body;
    element.style.color = "white";
    element.style.backgroundColor = "#000019";
   
    var login = document.getElementById("loginform");
    if(login  == null){
        login = document.getElementById("CheckoutForm");
    }
    login.style.backgroundColor = "#000019";
    login.style.color = "white";
    
    btn.innerHTML = "Light Mode";
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
    btn.setAttribute("onclick", "Light(this)");

}
function Light(btn){
    var element = document.body;
    element.style.color = "black";
    element.style.backgroundColor = "#ddd";
   
    var login = document.getElementById("loginform");
    if(login  == null){
        login = document.getElementById("CheckoutForm");
    }
    login.style.backgroundColor = "#f1f1f1";
    login.style.color = "black";
    
    btn.innerHTML = "Dark Mode";
    btn.style.backgroundColor = "#000019";
    btn.style.color = "white";
    btn.setAttribute("onclick", "Dark(this)");
}

function FrontPageDark(button){
    var body = document.body;
    var nav = document.getElementById("nav");
    var btn = document.getElementsByClassName("btn");
    var all = document.getElementsByTagName("*");
    nav.classList.add("bg-dark");
    body.style.backgroundColor = "#000019";

    

    for(var i = 0; i < all.length; i++){
        all[i].style.color = "white";
    }
    for(var i = 0; i < btn.length; i++){
        btn[i].style.backgroundColor = "white";
        btn[i].style.color = "black";}


    button.value = "Light Mode";
    button.setAttribute("onclick", "FrontPageLight(this)");
}

function FrontPageLight(button){
    var body = document.body;
    var nav = document.getElementById("nav");
    var btn = document.getElementsByClassName("btn");
    var all = document.getElementsByTagName("*");

    nav.classList.remove("bg-dark");
    body.style.backgroundColor = "white";
    
        for(var i = 0; i < all.length; i++){
            all[i].style.color = "black";
        }
        for(var i = 0; i < btn.length; i++){
            btn[i].style.backgroundColor = "#000019";
            btn[i].style.color = "white";}
       
        button.value = "Dark Mode";
        button.setAttribute("onclick", "FrontPageDark(this)");
}
