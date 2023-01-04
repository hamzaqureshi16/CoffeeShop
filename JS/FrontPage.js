//on load counting the number of items in th SESSION STORAGE
window.onload = function () {
    //get the key named products in session storage

    var products = JSON.parse(localStorage.getItem("products"));
    
    document.getElementById('lblCartCount').innerHTML = products.length;
}