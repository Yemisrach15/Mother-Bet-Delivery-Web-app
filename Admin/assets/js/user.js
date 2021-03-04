const tbody = document.querySelector('tbody');
const filter = document.getElementById('form1');

let dbRequest = indexedDB.open('users', 1);

dbRequest.onsuccess = function(event) {
    db = dbRequest.result;
    displayUsers();
}

function displayUsers() {
    let userStore = db.transaction('users').objectStore('users');

    userStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            let userRow = document.createElement('tr');
            userRow.className = 'user-row';

            let user = `<td>${cursor.value.id}</td>
            <td class='user-name'>${cursor.value.userName}</td>
            <td>${cursor.value.phoneNumber}</td>`;
            userRow.innerHTML = user
            tbody.appendChild(userRow);
            cursor.continue();
        }
    }
}

filter.addEventListener('keyup', filterUsers);
    function filterUsers(e) {
        let inputTxt = document.querySelector("#form1").value;
        let usersFilter = document.querySelectorAll(".user-row");
        usersFilter.forEach( function(user) {
            if (user.querySelector('.user-name').textContent.toLowerCase().indexOf(inputTxt) == -1) {
                user.style.display = "none";
            } else {
                user.style.display = "table-row";
            }
        })
    }