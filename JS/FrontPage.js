//on load counting the number of items in th SESSION STORAGE
window.onload = function () {
    //get the key named products in session storage
    document.getElementById('lblCartCount').innerHTML = JSON.parse(localStorage.getItem('countItems'));
}

var openLogin =()=>{
    window.location.href = "CoffeeLogin.html";
}

var openSignUp = () =>{
    window.location.href = "signup.html";
}

var openCart = () =>{
    window.location.href = "cart.html";
}