const userNameView = document.getElementById('user-name');
const favList = document.querySelector('.fav-list');

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('username');
var userFav = [];

// var db;
// var dbFood;

document.addEventListener('DOMContentLoaded', () => {
    userNameView.textContent = userName;

    function loadFavoritesFromDB(storeName, userName) {
        return new Promise( (resolve, reject) => {
            var dbRequest = indexedDB.open(storeName, 1);
            dbRequest.onsuccess = function() {
                var db = dbRequest.result;
                var transaction = db.transaction([storeName]);
                var usersStore = transaction.objectStore(storeName);
                var objectRequest = usersStore.index('userName').get(userName);

                objectRequest.onsuccess = function() {
                    if (objectRequest.result) {
                        resolve(objectRequest.result.favorites);
                    } else {
                        reject(Error("No favorites found"));
                    }
                }

                objectRequest.onerror = function() {
                    reject(Error("Transaction failed"));
                }
            }
        })
    }

    function iterateFavFood(storeName, lst, index) {
        return new Promise( (resolve, reject) => {
            var dbRequest = indexedDB.open(storeName, 1);
            dbRequest.onsuccess = function() {
                var db = dbRequest.result;
                var foodStore = db.transaction([storeName]).objectStore(storeName);
        
                var output = '';
                var favFood = foodStore.get(lst[index]);
        
                favFood.onsuccess = function() {
                    if (favFood.result) {
                        output = `<li class="nav-item">
                        <a class="nav-link show" data-toggle="tab" href="#tab-${index + 1}">${favFood.result.foodName}</a>
                            </li> `
                        resolve(output);
                    } else {
                        reject(Error('No favorite data'));
                    }
                }
        
                favFood.onerror = function() {
                    reject(Error('Transaction failed'));
                }
            }
        })
    }

    function displayFavoritesFromDB(storeName, lst){
        var dbRequest = indexedDB.open(storeName, 1);

        dbRequest.onsuccess = function() {

            var outputAll = '';
            for (let i = 0; i < lst.length; i++) {
                iterateFavFood(storeName, lst, i)
                .then((response) => {
                    outputAll += response;
                    favList.innerHTML = outputAll;
                });       
            }                
        };
    }

    loadFavoritesFromDB('users', userName)
    .then((response) => {
        displayFavoritesFromDB('foods', response);
    })
    // let userDB = indexedDB.open('users', 1);
    // userDB.onsuccess = function() {
    //     db = userDB.result;
    //     getFavorites();
    // } 
    
    // let foodDB = indexedDB.open('foods', 1);
    // foodDB.onsuccess = function() {
    //     dbFood = foodDB.result;
    //     displayFavorites();
    // }
    
    function getFavorites(db) {
        var transaction = db.transaction(['users']);
        var usersStore = transaction.objectStore('users');
        var request = usersStore.index('userName').get(userName);

        request.onsuccess = function() {
            if (request.result) {
                userFav = request.result.favorites;
            } else {
                console.log("No favorites found");
            }
        }

        request.onerror = function() {
            console.log("Transaction failed");
        }

    }
    
    function displayFavorites() {
        var foodStore = dbFood.transaction(['foods']).objectStore('foods');

        var output = '';
        var favFood;
        for (let i = 0; i < userFav.length; i++) {
            favFood = foodStore.index('id').get(userFav[i]);

            favFood.onsuccess = function() {
                if (favFood.result) {
                    output += `<li class="nav-item">
                    <a class="nav-link show" data-toggle="tab" href="#tab-${i + 1}">${favFood.result.foodName}</a>
                        </li> `
                } else {
                    console.log('No favorite data');
                }
            }

            favFood.onerror = function() {
                console.log('Transaction failed');
            }
        }
        favList.innerHTML = output;
    };
})