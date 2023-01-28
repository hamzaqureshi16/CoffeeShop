var CheckUser = () =>{
    var users = JSON.parse(localStorage.getItem('registeredUsers'));
    //check if the email and passwords match
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    var loggingIn =users.find(x=> (x.email == email.value) && (x.password == password.value));
    if( loggingIn !== null){
        //mark both imputes as valud and set back ground color as white
        email.style.backgroundColor = 'white';
        password.style.backgroundColor = 'white';
        //redirect to the home page
        
        localStorage.setItem("currentUser", JSON.stringify(loggingIn));
        window.location.href = '../FrontPage.html';
    }
    else{
        
        email.style.backgroundColor = 'red';
        password.style.backgroundColor = 'red';
        email.setCustomValidity('Invalid email or password');
        password.setCustomValidity('Invalid email or password');

    }
}
document.getElementById('Login').onclick = () =>{
    CheckUser();
}