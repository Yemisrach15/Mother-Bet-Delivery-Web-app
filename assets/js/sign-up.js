const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('form');
const password = document.getElementById('form');
const password2 = document.getElementById('form');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    checkInputs()
});

function checkInputs(){
    const usernamevalue = username.value.trim();
    const emailvalue = email.value.trim();
    const passwordvalue = password.value.trim();
    const password2value = password2.value.trim();

    if(usernamevalue === ''){
        setErrorFor(username, 'username cant be blank');    
    } else {

        setSuccessFor(username);
    }
    if(emailvalue === ''){
        setErrorFor(email, "Email cannot be blank");
    }else if (!isEmail(emailvalue)){
        setErrorFor(email, "email is not valid");
    }else{
        setSuccessFor(email)
    }

    if(passwordvalue === ''){
        setErrorFor(password, 'password cannot be blank');
    }else{
        setSuccessFor(password);
    }

    if(password2value === ''){
        setErrorFor(password2, 'password2 cannot be blank');
    }else if(passwordvalue !== passwordvalue2){
        setErrorFor(password2, "password doent match");
    }else{
        setSuccessFor(password2);
    }
}

    function setErrorFor(input, message){
        const formControl  = input.parentElement;
        const small = formControl.querySelector('small');

        small.innerText = message;
        formControl.className = 'form-control error';
    }


    function setSuccessFor(input){
        const formControl = input.parentElement;
        formControl.className = 'form-control success'
    }

    function isEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }