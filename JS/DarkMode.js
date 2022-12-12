function Dark(btn){
    var element = document.body;
    element.style.color = "white";
    element.style.backgroundColor = "#000019";
   
    var login = document.getElementById("loginform");
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
    login.style.backgroundColor = "#f1f1f1";
    login.style.color = "black";
    
    btn.innerHTML = "Dark Mode";
    btn.style.backgroundColor = "#000019";
    btn.style.color = "white";
    btn.setAttribute("onclick", "Dark(this)");
}
