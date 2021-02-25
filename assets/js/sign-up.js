

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');
const signUpSuccess = document.querySelector('.signUp-success');
 
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    checkInputs();
    if (username.parentElement.className == 'form-control success' &&  
        password.parentElement.className == 'form-control success' &&
        password2.parentElement.className == 'form-control success' &&
        phone.parentElement.className == 'form-control success') {
            console.log('form success');
            signUpSuccess.textContent = 'You have successfully signed up';

            let userDatabase;
            let userDB = indexedDB.open('users', 1);
            userDB.onsuccess = function() {
                userDatabase = userDB.result;
                let transaction = userDatabase.transaction(['users'], 'readwrite');
                let userStore = transaction.objectStore('users');
                
                let newUser = {
                    userName: username.value.trim(), 
                    password: password.value.trim(), 
                    favorites: [], 
                    phoneNumber: phone.value.trim()
                }

                let addUserRequest = userStore.add(newUser);
                addUserRequest.onsuccess = () => {
                    setTimeout(() => {
                        form.submit();
                    }, 1000);
                }
                transaction.oncomplete = () => {
                    console.log('new user added');
                }
                transaction.onerror = () => {
                    console.log('There was an error adding new user');
                }
            }
    }
});

function checkInputs(){

    const usernamevalue = username.value.trim();
    const passwordvalue = password.value.trim();
    const password2value = password2.value.trim();
    const phonenumber = phone.value.trim();

    if(usernamevalue === ''){
        setErrorFor(username, 'username cant be blank');    
    } else {

        setSuccessFor(username);
    }

    if(passwordvalue === ''){
        setErrorFor(password, 'password cannot be blank');
    }else{
        setSuccessFor(password);
    }

    if(password2value === ''){
        setErrorFor(password2, 'confirmation password is blank');
    }else if(passwordvalue !== password2value){
        setErrorFor(password2, "password does not match, Try again");
    }else{
        setSuccessFor(password2);
    }

    if(phonenumber === ''){
        setErrorFor(phone, 'phone number cant be blank');    
    } else {

        setSuccessFor(phone);
    }
}

function setErrorFor(input, message){
    const formControl  = input.parentElement;
    const small = formControl.querySelector(`small`);

    small.innerText = message;
    formControl.className = 'form-control error';
}


function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}
