var Checkout = () => {
  //check if the textarea with id instructions is empty or not

  if(document.getElementById('instructions').value == ''){
  

}
}
function verifyCoupon(){//method to verify the user's coupon
  var userCoupon = document.getElementById('couponInput').value;//gets coupon entered by user
  var coupons = JSON.parse(localStorage.getItem('coupons'));//get valid coupons from storage
   
  for(let i = 0; i < coupons.length ; i++){//iterates over the valid coupons
    if(userCoupon == coupons[i].text){//checking if the user's coupon is valid or not
      CalculateTotal(coupons[i].discount);//applying discount to the total bill
      document.getElementById('couponInput').disabled = 'true';//disabling the input field
      alert('Coupon Applied');//alert
      return;
    }
  }
  alert('Invalid Coupon');//invalid coupon alert
}

//make method to generate random coupon codes
var generateCoupon = () => {

  var couponText = ['hamza','bato','hunnain','khansa','noor','thunderbolt'];//names that coupon will be generated from
  var coupon = [];//coupons will be stored here along with their discounts in the from of object (array of objects)

  for(let j = 0 ; j < Math.floor(Math.random() * 6) ; j++){//generating random number of coupons
    coupon[j] =  {
      text : couponText[Math.floor(Math.random() * (couponText.length))],
      discount : Math.random() * 0.25
    }//generating random discount and selecting a keyword from the couponText array
     
    for(let i = 0; i < (1 + Math.floor(Math.random() * 6)) ; i++){//for number of digits in coupon text
      coupon[j].text += Math.floor(Math.random() * 11);//insert random numbers in the coupon text
      }
      
  
  }
  
  localStorage.setItem('coupons',JSON.stringify(coupon));//finally storing the valid coupons in session storage 
 
  }

  var increaseQuantity = (elem) =>{
    var quantity = parseInt(elem.innerHTML) + 1;
    if( quantity >=0 ){
      elem.innerHTML =  (quantity).toString();
    }
    else{
      elem.innerHTML = '0';
    }

    var id =elem.attributes.id.value.replace('quantity','');

    //find product with name id in local storage
    var prods = JSON.parse(localStorage.getItem('products'));
    prods.find(x=> x.name == id).quantity = quantity;
    localStorage.setItem('products',JSON.stringify(prods));

    
    
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
    var id =elem.attributes.id.value.replace('quantity','');

    //find product with name id in local storage
    var prods = JSON.parse(localStorage.getItem('products'));
    if(quantity >=0){
      prods.find(x=> x.name == id).quantity = quantity;
    }
    localStorage.setItem('products',JSON.stringify(prods));
     CalculateTotal();
    }
    
  

//method to remove a specific product => invocation if through onclick attribute of the button tag
function removeItem(elem,name){

  var prods = JSON.parse(localStorage.getItem('products'));//getting the products from the SessionStorage
 
  var index = prods.indexOf(name.innerHTML);//getting the index of the product to be removed
  prods.splice(index,1);//removing the product from the array
  localStorage.setItem('products',JSON.stringify(prods));//updating the SessionStorage


  elem.remove();//removing the products enclosing <tr>
  var newCount = JSON.parse(localStorage.getItem('countItems')) -1;

  localStorage.setItem('countItems',newCount);
CalculateTotal();//calaculates the new total

//end of method
}

//method used to calculate the total bill of the cart
var CalculateTotal = (discount = 0.0) => {

    var shipping = 0;//current shipping cost
    var shippingRate = 80;//current shipping cost/item
    var total = 0;//total of items in cart
    var tax = 0.12;//tax rate 12% of total
    var price, quantity;
    var prods = JSON.parse(localStorage.getItem('products'))
    for(var i = 0 ; i < prods.length ; i++){ // looping over each product
        var product = prods[i];//fetching products from Sessionstorage
        var name = product.name.replace(/\s/g, '');//constructing the id of the outer tag that encloses all the information of the products
        price = "price" +  name;
        quantity = "quantity" + name;

        price = document.getElementById(price);//getting the price element
        quantity = document.getElementById(quantity);//getting the quantity element
        

        total +=  parseFloat(price.innerHTML.slice(3,price.innerHTML.length)) * parseFloat(quantity.innerHTML);//adding the price to the total(converting the price to double and removing the $ sign from it)
        shipping += (shippingRate * parseFloat(quantity.innerHTML));//adding the shipping cost according to the quantity
    }

    tax *= total// calculating the tax
    var grandTotal = (shipping + total + tax).toFixed(2); //grand total to be paid by the customer
     
    document.getElementById('shipping').innerHTML = "PKR " + shipping.toString();//displaying shipping cost to the document
    document.getElementById('tax').innerHTML = 'PKR ' + tax.toFixed(2).toString();//displaying tax to the document
    total = 'PKR ' + total.toString();
    document.getElementById('total').innerHTML = total; // displaying the total product cost to the document
    

    if(discount == 0.0){
      document.getElementById('grandTotal').innerHTML = 'PKR ' + grandTotal.toString();//displaying the grand total product cost to the document
    }
    else if(discount > 0.0){
      document.getElementById('grandTotal').innerHTML = 'PKR ' + (grandTotal - (grandTotal * discount)).toFixed(2).toString();//displaying the grand total product cost to the document
    }

    

    
}

//method that displays the items in the cart.
var showCart = () => {
  generateCoupon();//generating coupons first
  


  var outerID, product, removeID , priceID, quantityID,nameID;//variables to store the various tag used(minimizing code)
  var prods = JSON.parse(localStorage.getItem('products'));
  localStorage.setItem('countItems',prods.length);
for(var i =0 ; i < prods.length ; i++){//looping over the product keys
    console.log(prods[i]);
    product = prods[i]//converting the string in SessionStorage to JSON
    outerID = product.name.replace(/\s/g, '');//constructing the id of the outer tag that encloses all the information of the products
    removeID = "remove" + outerID;//constructing the id of the remove button
    priceID = "price" + outerID;//constructing the id of the price tag
    nameID = "name" + outerID;
    quantityID = "quantity" + outerID;//constructing the id of the quantity tag

    console.log(quantityID);
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
    <td class="border-0 align-middle"><strong id=${priceID}>PKR ${product.price}</strong></td>
    <td class="border-0 align-middle"><strong id=${quantityID}>${product.quantity}</strong></td>
    <td class="border-0 align-middle"><a href="#" class="text-dark"><button class = "rounded-pill border-1 border-danger" onclick = "decreaseQuantity(${quantityID})">-</button><button class="fa fa-trash rounded-pill border-warning mx-2" id = ${removeID} onclick = "removeItem(${outerID},${nameID})"></button><button class = "rounded-pill border-1 border-success" onclick = "increaseQuantity(${quantityID})">+</button></a></td>
  </tr>`;
    document.getElementById('products').innerHTML += htm;//adding the html to the document
}

CalculateTotal();//total bill is calculated at the end

//end of method
}



var CheckOut = ()=>{
  var checked;
  var ele = document.getElementsByName('toDeliver');
  for(i =0; i< ele.length; i++){
    if(ele[i].checked){
      checked = ele[i].value;
    }
  }
  if(JSON.parse(localStorage.getItem('currentUser')) !== null){
   
    if(checked == 'delivery'){
      window.location.href = "../Delived.html";
    }
    else{
      window.location.href = "../DineIn.html";
    }
  }
  else{
    if(checked == 'delivery'){
      window.location.href = "../Delivery.html";
    }
    else{
      window.location.href = "../Checkout.html";
    }
  }
}
window.addEventListener('load', showCart); // when window is loaded the cart is shown on the document
