var productArray = [];//stores all the keys for the SessionStorage
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
}];//dummy data of chosen products

for(var i = 0; i < products.length; i++){//storing the objects as string in SessionStorage
    sessionStorage.setItem('product'+i, JSON.stringify(products[i]));
    productArray[i] = 'product'+i;//storing the keys
}



//method that displays the items in the cart.
var showCart = () => {
  var outerID, product, removeID , remove;//variables to store the various tag used(minimizing code)
  
  
for(var i =0 ; i < productArray.length ; i++){//looping over the product keys

    product = JSON.parse(sessionStorage.getItem(productArray[i]));//converting the string in SessionStorage to JSON
    outerID = product.name.replace(/\s/g, '');//constructing the id of the outer tag that encloses all the information of the products
    removeID = "remove" + outerID;//constructing the id of the remove button
     
    //constructing the html code using multiline strings and interlpolation 
    var htm = `<tr id = ${outerID}>
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
    <td class="border-0 align-middle"><a href="#" class="text-dark"><button class="fa fa-trash rounded-pill" id = ${removeID} onclick = "removeItem(${outerID})"></button></a></td>
  </tr>`;
    document.getElementById('products').innerHTML += htm;//adding the html to the document
  
}

CalculateTotal();//total bill is calculated at the end

//end of method
}

//method to remove a specific product => invocation if through onclick attribute of the button tag
function removeItem(elem){
 elem.remove();//removing the products enclosing <tr>
CalculateTotal();//calaculates the new total
 
//end of method
}


//method used to calculate the total bill of the cart
var CalculateTotal = () => {
    var price = document.getElementsByClassName('price');//element where price is displayed in html
    var quantity = document.getElementsByClassName('quantity');//element where quantity of displayed in html
    var shipping = 0;//current shipping cost
    var shippingRate = 2;//current shipping cost/item
    var total = 0;//total of items in cart
    var tax = 0.12;//tax rate 12% of total
    for(var i = 0 ; i < price.length ; i++){ // looping over each product's price
        total +=  parseFloat(price[i].innerHTML.slice(1,price[i].innerHTML.length)) * parseFloat(quantity[i].innerHTML);//adding the price to the total(converting the price to double and removing the $ sign from it)
        shipping += (shippingRate * parseFloat(quantity[i].innerHTML));//adding the shipping cost according to the quantity
    }
    tax *= total// calculating the tax
    var grandTotal = shipping + total + tax; //grand total to be paid by the customer
     
    document.getElementById('shipping').innerHTML = "$" + shipping.toString();//displaying shipping cost to the document
    document.getElementById('tax').innerHTML = '$' + tax.toFixed(2).toString();//displaying tax to the document
    total = '$' + total.toString();
    document.getElementById('total').innerHTML = total; // displaying the total product cost to the document
    document.getElementById('grandTotal').innerHTML = '$' + grandTotal.toString();//displaying the grand total product cost to the document
    


    
}

window.addEventListener('load', showCart); // when window is loaded the cart is shown on the document


