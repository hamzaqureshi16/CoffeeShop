var productArray = [];
var products = [{
    name:'Cartier watch',
    price : '$79.00',
    url : 'https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg',
    category : 'Watches',
    quantity : 3
}, {
    name:'Lumix camera lense',
    price : '$79.00',
    url : 'https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-3_cexmhn.jpg',
    category : 'Camera',
    quantity : 3
},{
    name:'Gray Nike running shoe',
    price : '$79.00',
    url : 'https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-2_qxjis2.jpg',
    category : 'Shoes',
    quantity : 3
}];

for(var i = 0; i < products.length; i++){
    sessionStorage.setItem('product'+i, JSON.stringify(products[i]));
    productArray[i] = 'product'+i;
}




var showCart = () => {
  var tagToRemove, product, removeID , remove;
  
  
for(var i =0 ; i < productArray.length ; i++){

     product = JSON.parse(sessionStorage.getItem(productArray[i]));
     tagToRemove = product.name.replace(/\s/g, '');
     removeID = "remove" + tagToRemove[i];
     
    var htm = `<tr id = ${tagToRemove}>
    <th scope="row" class="border-0">
      <div class="p-2">
        <img src="${product.url}" alt="" width="70" class="img-fluid rounded shadow-sm">
        <div class="ml-3 d-inline-block align-middle">
          <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">${product.name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: ${product.category}</span>
        </div>
      </div>
    </th>
    <td class="border-0 align-middle"><strong class="price">${product.price}</strong></td>
    <td class="border-0 align-middle"><strong class="quantity">${product.quantity}</strong></td>
    <td class="border-0 align-middle"><a href="#" class="text-dark"><button class="fa fa-trash rounded-pill" id = ${removeID} onclick = "removeItem(${tagToRemove})"></button></a></td>
  </tr>`;
    document.getElementById('products').innerHTML += htm;
    
    remove = document.getElementById(removeID);
    
     
    
}

CalculateTotal();



}





function removeItem(elem){
 elem.remove();
CalculateTotal();
  
}



var CalculateTotal = () => {
    var price = document.getElementsByClassName('price');
    var quantity = document.getElementsByClassName('quantity');
    var shipping = 0;
    var shippingRate = 2;
    var total = 0;
    var tax = 0.12;
    for(var i = 0 ; i < price.length ; i++){
        total +=  parseFloat(price[i].innerHTML.slice(1,price[i].innerHTML.length)) * parseFloat(quantity[i].innerHTML);
        shipping += (shippingRate * parseFloat(quantity[i].innerHTML));
    }
    tax *= total
    var grandTotal = shipping + total + tax;
     
    document.getElementById('shipping').innerHTML = "$" + shipping.toString();
    document.getElementById('tax').innerHTML = '$' + tax.toFixed(2).toString();
    total = '$' + total.toString();
    document.getElementById('total').innerHTML = total;
    document.getElementById('grandTotal').innerHTML = '$' + grandTotal.toString();
    


    
}

window.addEventListener('load', showCart);


