var verifyNumber = (number) => {//method to verify the mobile number
    var regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;//regex gernated by chatGPT to test pakistani mobile numbers
    
    if(regex.test(number.value)){//testing the value against the regex to verify that the value conforms
         //show invalid input message
         number.style.backgroundColor = "white";
         number.setCustomValidity("");//sets the control's validity as valid
         return true;
    }
    else{
         
         //set field invalid
         number.setCustomValidity('Invalid Phone Number');//if the value does not conform then marks the control as invalid
         number.style.backgroundColor = "red";
         return false;
    
    }    
        
    }

    
var verifyAddres = () =>{
    var address = document.getElementById('address');
    if(address.value.length > 10){
      address.style.backgroundColor = "white";
      address.setCustomValidity("");
      return true;
  }
  else{
      address.setCustomValidity("Invalid Address");
      address.style.backgroundColor = "red"
      return false;
  }
  }

var verifyName = () =>{ 
    var name = document.getElementById('name');
    if(name.value.length > 3){
        name.style.backgroundColor = "white";
        name.setCustomValidity("");
        return true;
    }
    else{
        name.setCustomValidity("Invalid Name");
        name.style.backgroundColor = "red";
        return false;
    }
}

var checkEmpty = () => {
    var name = document.getElementById('name');
    var address = document.getElementById('address');
    var number = document.getElementById('phone');
    if(name.value == "" || address.value == "" || number.value == ""){
        alert("Please fill all the fields");
        return false;
    }
    else{
        return true;
    }
}


  document.getElementById('loginform').onsubmit=()=>{

    if(checkEmpty()){
        if(verifyNumber(document.getElementById('phone')) && verifyAddres() && verifyName()){
            //make an object of the form data
            var data = {
                name: document.getElementById('name').value,
                address: document.getElementById('address').value,
                number: document.getElementById('phone').value,
                instructions:document.getElementById('instruction'),
                cart:JSON.parse(localStorage.getItem('products'))
                
        }

        var deliveries = JSON.parse(localStorage.getItem('deliveries'));
        if(deliveries ===null){
            deliveries = [];
        }
        deliveries.push(data);
        localStorage.setItem('deliveries',JSON.stringify(deliveries));
        localStorage.removeItem('products');
        alert("Order Placed Successfully");
    }
  }
}