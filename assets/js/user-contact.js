const userNameView = document.getElementById('user-name');
const userContact = document.querySelector('.user-contact');
const userAbout = document.querySelector('.user-about');
const userIndex = document.querySelector('.user-index');

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('username');

document.addEventListener('DOMContentLoaded', () => {
    userNameView.textContent = userName;
    userContact.setAttribute('href', `user-contact.html?username=${userName}`);
    userAbout.setAttribute('href', `user-about.html?username=${userName}`);
    userIndex.setAttribute('href', `user-index.html?username=${userName}`);

});