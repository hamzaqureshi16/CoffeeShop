var VerifyCard= (cardInput)=>{//method to verfy the card entered by the user
     //remove all - from cardInput's value
     var card = cardInput.value.replace(/-/g,'');//remove all the '-' in the value
     if(typeof(parseInt(card)) ==  typeof(0)){//convert it to integer
          cardInput.setCustomValidity("");//mark the field as valid
          return true;
     }
     else{
          cardInput.setCustomValidity('Invalid Card Number');//mark the field as invalid
          return false;
     }

}

var verifyExpiry = (expiry) =>{
     //check if the date of expiry has passed or not
     var date = new Date();
     if(date < new Date(expiry.value) ){//expiry date is later than today
           expiry.setCustomValidity("");//mark the field as valid
           return true;
    }
     else{
          expiry.setCustomValidity('Your Card has Expired');//mark the field as invalid
          return false;
     }

}


var verifyCVV = (CVV) =>{
     //check if the CVV is valid or not
     if(CVV.value.length == 3){//check if the length of the CVV is 3
          CVV.setCustomValidity("");//mark the field as valid
          return true;
     }
     else{
          CVV.setCustomValidity('Invalid CVV');//mark the field as invalid
          return false;
     }
}

document.getElementById('card').addEventListener("keydown",() => {//dynamically add - to the card's value (change event did not work properly)
     var cardInput = document.getElementById('card');//get the control 
//dynamically add a - after every 4 characters entered
     if((cardInput.value.length+1) % 5 == 0 && cardInput.value.length != 19 ){//after every 4 characters entered adds a - to the value
          cardInput.value += '-';
     }
});



document.getElementById('submit').addEventListener('click',() =>{//form submission event handler
     if(VerifyCard(document.getElementById('card')) && verifyExpiry(document.getElementById('expiry'))
      && verifyCVV(document.getElementById('cvv')) ){
               if(document.getElementById('toDeliver').value == 'delivery'){
                    window.location.href = '../Delivery.html';
               }
               else{
                    window.location.href = '../Delived.html';
               }
         }
});




