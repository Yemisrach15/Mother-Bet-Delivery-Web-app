const form = document.getElementById('login-form');
const adminName = document.getElementById('userName');
const pwd = document.getElementById('password');
const showError = document.querySelector('.show-error');

form.addEventListener('submit', authenticateAdmin);

function authenticateAdmin(e) {
    e.preventDefault();

    if ((adminName.value == "admin") && (pwd.value == "123admin")) {
        e.target.submit();
    } else {
        showError.textContent = "Incorrect username or password entered.";
    }
}