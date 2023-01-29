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

  var verifyPassword = ()=>{

    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirm_password');
    console.log(password.value.length)
    if(password.value == confirmPassword.value){
        

        if(password.value.length > 8){
          password.style.backgroundColor = "white";
          password.setCustomValidity("");
          confirmPassword.setCustomValidity("");
          return true;
        }
        else{
          password.setCustomValidity("Password must be 8 characters long");
          confirmPassword.setCustomValidity("Password must be 8 characters long");
          password.style.backgroundColor = "red"
          return false;
        }
    }
    else{
        password.setCustomValidity("Passwords do not match");
        confirmPassword.setCustomValidity("Passwords do not match");
        password.style.backgroundColor = "red"
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


  var checkIfEmpty = ()=>{
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirm_password');
    var contact = document.getElementById('contact');
    var address = document.getElementById('address');
    if(username.value == '' || email.value == '' || password.value == '' || confirmPassword.value == '' || contact.value == '' || address.value == ''){
      username.setCustomValidity("All fields are required");
      email.setCustomValidity("All fields are required");
      password.setCustomValidity("All fields are required");
      confirmPassword.setCustomValidity("All fields are required");
      contact.setCustomValidity("All fields are required");
      address.setCustomValidity("All fields are required");
      return false;
    }
    else{
      return true;
    }
  }


document.getElementById('submit').onclick = () => {
  console.log('submit')
   if(checkIfEmpty()){
    if(verifyNumber(document.getElementById('contact')) && verifyPassword() && verifyAddres()){
      //make an object of the form data
      console.log('acced')
     //make an object of the form data and store it in localstorage
      var user = {

          name: document.getElementById('username').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          contact: document.getElementById('contact').value,
          address: document.getElementById('address').value
      }
      //check if an item name registeredusers is present in localstorage if not then make it
      var users = localStorage.getItem('registeredUsers');
      if( users == null){
          localStorage.setItem('registeredUsers', JSON.stringify([]));
      }
      //get the registered users from localstorage
      var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers'));
      //push the new user to the array
      registeredUsers.push(user);
      //set the new array in localstorage
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      //redirect to login page
      window.location.href = "../CoffeeLogin.html";

  }
  else{
      alert("not successfully registered")
      return false;
  }
   }
}