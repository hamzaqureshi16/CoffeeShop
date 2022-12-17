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
    sessionStorage.setItem(products[i].name.toString(), JSON.stringify(products[i]));
    productArray[i] = products[i].name.toString();//storing the keys
}

var increaseQuantity = (elem) =>{
  var quantity = parseInt(elem.innerHTML) + 1;
  if( quantity >=0 ){
    elem.innerHTML =  (quantity).toString();
  }
  else{
    elem.innerHTML = '0';
  }
  
  CalculateTotal();
}
var decreaseQuantity = (elem) =>{
  var quantity = parseInt(elem.innerHTML) - 1;
  if( quantity >=0 ){
    elem.innerHTML =  (quantity).toString();
  }
  else{
    elem.innerHTML = '0';
  }
   CalculateTotal();
}

function verifyCoupon(){
  var userCoupon = document.getElementById('couponInput').value;
  var coupons = JSON.parse(sessionStorage.getItem('coupons'));
  var grandTotal = document.getElementById('grandTotal').innerHTML;
  
  //console.log(coupons[1]);
   
  for(let i = 0; i < coupons.length ; i++){
    if(userCoupon == coupons[i].text){
      CalculateTotal(coupons[i].discount);
      alert('Coupon Applied');
      return;
    }
  }
}

//make method to generate random coupon codes
var generateCoupon = () => {

  var couponText = ['hamza','bushra','hunnain','khansa','noor','bijli'];
  var index = Math.floor(Math.random() * (couponText.length));
  var coupon = [];

  for(let j = 0 ; j < Math.floor(Math.random() * 6) ; j++){//generating random number of coupons
    coupon[j] = 
    {text : couponText[Math.floor(Math.random() * (couponText.length))],
      discount : Math.random() * 0.25
    }
     
    for(let i = 0; i < (1 + Math.floor(Math.random() * 6)) ; i++){//for number of digits in coupon
      coupon[j].text += Math.floor(Math.random() * 11);
      }
  console.log(coupon[j]);
  }
  
  sessionStorage.setItem('coupons',JSON.stringify(coupon));
  // var test = couponText.toString();
  // test = test.split(',');
  }

//method that displays the items in the cart.
var showCart = () => {
  generateCoupon();
  


  var outerID, product, removeID , priceID, quantityID,nameID;//variables to store the various tag used(minimizing code)
  
  
for(var i =0 ; i < productArray.length ; i++){//looping over the product keys

    product = JSON.parse(sessionStorage.getItem(productArray[i]));//converting the string in SessionStorage to JSON
    outerID = product.name.replace(/\s/g, '');//constructing the id of the outer tag that encloses all the information of the products
    removeID = "remove" + outerID;//constructing the id of the remove button
    priceID = "price" + outerID;//constructing the id of the price tag
    nameID = "name" + outerID;
    quantityID = "quantity" + outerID;//constructing the id of the quantity tag
    //constructing the html code using multiline strings and interlpolation 
    var htm = `<tr id = ${outerID}>
    <th scope="row" class="border-0">
      <div class="p-2">
        <img src="${product.url}" alt="" width="70" class="img-fluid rounded shadow-sm">
        <div class="ml-3 d-inline-block align-middle">
          <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle" id=${nameID}>${product.name}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: ${product.category}</span>
        </div>
      </div>
    </th>
    <td class="border-0 align-middle"><strong id=${priceID}>${product.price}</strong></td>
    <td class="border-0 align-middle"><strong id=${quantityID}>${product.quantity}</strong></td>
    <td class="border-0 align-middle"><a href="#" class="text-dark"><button class = "rounded-pill border-1 border-danger" onclick = "decreaseQuantity(${quantityID})">-</button><button class="fa fa-trash rounded-pill border-warning mx-2" id = ${removeID} onclick = "removeItem(${outerID},${nameID})"></button><button class = "rounded-pill border-1 border-success" onclick = "increaseQuantity(${quantityID})">+</button></a></td>
  </tr>`;
    document.getElementById('products').innerHTML += htm;//adding the html to the document
}

CalculateTotal();//total bill is calculated at the end

//end of method
}



//method to remove a specific product => invocation if through onclick attribute of the button tag
function removeItem(elem,name){


    sessionStorage.removeItem(name.innerHTML);//removing the product from the SessionStorage
    productArray.splice(productArray.indexOf(name.innerHTML),1);//removing the key from the productArray
    elem.remove();//removing the products enclosing <tr>
 
CalculateTotal();//calaculates the new total
 
//end of method
}


//method used to calculate the total bill of the cart
var CalculateTotal = (discount = 0.0) => {


    
    var shipping = 0;//current shipping cost
    var shippingRate = 2;//current shipping cost/item
    var total = 0;//total of items in cart
    var tax = 0.12;//tax rate 12% of total
    var price, quantity;
    for(var i = 0 ; i < productArray.length ; i++){ // looping over each product
        var product = JSON.parse(sessionStorage.getItem(productArray[i]));//fetching products from Sessionstorage
        var name = product.name.replace(/\s/g, '');//constructing the id of the outer tag that encloses all the information of the products
        price = "price" +  name;
        quantity = "quantity" + name;

        price = document.getElementById(price);//getting the price element
        quantity = document.getElementById(quantity);//getting the quantity element
        

        total +=  parseFloat(price.innerHTML.slice(1,price.innerHTML.length)) * parseFloat(quantity.innerHTML);//adding the price to the total(converting the price to double and removing the $ sign from it)
        shipping += (shippingRate * parseFloat(quantity.innerHTML));//adding the shipping cost according to the quantity
    }

    tax *= total// calculating the tax
    var grandTotal = (shipping + total + tax).toFixed(2); //grand total to be paid by the customer
     
    document.getElementById('shipping').innerHTML = "$" + shipping.toString();//displaying shipping cost to the document
    document.getElementById('tax').innerHTML = '$' + tax.toFixed(2).toString();//displaying tax to the document
    total = '$' + total.toString();
    document.getElementById('total').innerHTML = total; // displaying the total product cost to the document
    console.log(discount +' '+grandTotal);

    if(discount == 0.0){
      document.getElementById('grandTotal').innerHTML = '$' + grandTotal.toString();//displaying the grand total product cost to the document
    }
    else if(discount > 0.0){
      document.getElementById('grandTotal').innerHTML = '$' + (grandTotal - (grandTotal * discount)).toFixed(2).toString();//displaying the grand total product cost to the document
    }

    

    
}



window.addEventListener('load', showCart); // when window is loaded the cart is shown on the document



