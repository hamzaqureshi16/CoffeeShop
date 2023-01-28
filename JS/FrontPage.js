//on load counting the number of items in th SESSION STORAGE
window.onload = function () {
    //get the key named products in session storage
    document.getElementById('lblCartCount').innerHTML = JSON.parse(localStorage.getItem('countItems'));
}

var openLogin =()=>{//if login button is clicked open the login page
    window.location.href = "CoffeeLogin.html";
}

var openSignUp = () =>{//if sign up button is clicked open the signup page
    window.location.href = "signup.html";
}

var openCart = () =>{//if the cart icon is clicked open the user's cart
    window.location.href = "cart.html";
}




var verifyNumber = (number) => {//method to verify the mobile number
    var regex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;//regex gernated by chatGPT to test pakistani mobile numbers
    
    if(regex.test(number.value)){//testing the value against the regex to verify that the value conforms
         //show invalid input message
         number.setCustomValidity("");//sets the control's validity as valid
         return true;
    }
    else{
         
         //set field invalid
         number.setCustomValidity('Invalid Phone Number');//if the value does not conform then marks the control as invalid
    
         return false;
    
    }    
        
    }

    var VerifyDateTime = (dateInput, time) => {//method to verify the reservation date and time
        var date = new Date(dateInput.value);//converting input date to date object
        var now = new Date();//getting the current date
        var m = now.getMinutes();//extracting minute from current date
        var h = now.getHours();//extracting current hours from current date

        if(h == '0')//24th hour is 0 in date object reconverting it to 24
        {
            h = 24;
        }
  
        var currentTime = h+":"+m;//constructing current time string
    
        
       if( date.toLocaleDateString() == now.toLocaleDateString() ){//if the user has selected the current date 
            if(currentTime < time.value){//comparing the selected time to check if it has passed or not
                //set custome validity of time
                time.setCustomValidity("");//time is valid if it has not passed
                return true;
            }
            else{
                time.setCustomValidity("Invalid Time");//is invalid if it has passed
                return false;
            }
        }
        else{
            //all other inputs are invalid
            //set custom validity of date
            dateInput.setCustomValidity("Invalid Date");
            return false;
        }

    }
    

    var Logout = () =>{
        console.log('logout');
        localStorage.removeItem('currentUser');
        window.location.href = "FrontPage.html";
    }
window.addEventListener('load', () => {
    document.getElementById('date').min = new Date().toISOString().split('T')[0];//min date that can be selected is today
    let maxDate = new Date();//get current date to set max date that can be set
    maxDate.setMonth(maxDate.getMonth() + 2);//add a 2 months to the current date
    document.getElementById('date').max = maxDate.toISOString().split('T')[0];//setting maximum date that can be selected
    

    var currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser !== null){
        console.log(currentUser);

        console.log(document.getElementById('signupbtn'));
        //remove the signupbtn and loginbtn
       var logoutbtn = document.getElementById("loginbtn");
       
        document.getElementById('loginbtn').remove();
        document.getElementById('signupbtn').remove();
        
        //add the logoutbtn
        
        //add the user name
        var userName = document.createElement('h5');
        userName.setAttribute('id','userName');
        userName.setAttribute('class','text-light');
        userName.innerHTML = currentUser.name;
        userName.style.paddingTop = '6px';
        userName.style.marginLeft = '-45px';
        
        
        document.getElementById('btns').append(userName);
        

        logoutbtn.setAttribute('class','btn btn-outline-light btn-danger');
        logoutbtn.innerHTML = 'Logout';
        logoutbtn.setAttribute('onclick','Logout()');
        document.getElementById('navlist').append(logoutbtn);
       

    }
} );



document.getElementById('tableform').addEventListener('submit',() =>{
    if(verifyNumber(document.getElementById('phone')) && VerifyDateTime(document.getElementById('date'),document.getElementById('time'))){

    }

    
        

});