const tbody = document.querySelector('tbody');

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

            let user = `<td>${cursor.value.id}</td>
            <td>${cursor.value.userName}</td>
            <td>${cursor.value.phoneNumber}</td>`;
            userRow.innerHTML = user
            tbody.appendChild(userRow);
            cursor.continue();
        }
    }
}