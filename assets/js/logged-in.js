const userNameView = document.getElementById('user-name');
const favList = document.querySelector('.carousel-inner');
const userContact = document.querySelector('.user-contact');
const userAbout = document.querySelector('.user-about');
const userIndex = document.querySelector('.user-index');
const cards = document.querySelector(".cards");

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('username');
var userFav = [];

// var db;
// var dbFood;

document.addEventListener('DOMContentLoaded', () => {
    userNameView.textContent = userName;
    userContact.setAttribute('href', `user-contact.html?username=${userName}`);
    userAbout.setAttribute('href', `user-about.html?username=${userName}`);
    userIndex.setAttribute('href', `user-index.html?username=${userName}`);

    let foodDB = indexedDB.open('foods', 1);

    foodDB.onsuccess = function() {
        db = foodDB.result;
        displayMenu();
    }

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
                        if (index == 0) {
                        output += `<div class="carousel-item active">
                        <img class="d-block w-100 img-fluid" src="${favFood.result.imgSrc}"
                            alt="">
                        <div class="carousel-caption d-md-block">
                            <h5 class="carousel-foodName">${favFood.result.foodName}</h5>
                        </div>
                        </div>`;
                        } else {
                            output += `<div class="carousel-item">
                            <img class="d-block w-100 img-fluid" src="${favFood.result.imgSrc}"
                                alt="">
                            <div class="carousel-caption d-md-block">
                                <h5 class="carousel-foodName">${favFood.result.foodName}</h5>
                            </div>
                            </div>`;
                        }
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
    .then((favoriteArray) => {
        displayFavoritesFromDB('foods', favoriteArray);
    })

    function displayMenu() {

        let foodStore = db.transaction('foods').objectStore('foods');
  
        foodStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
  
            if (cursor) {
  
              let ratingStars = '';
              for (let i = 1; i <= cursor.value.rating; i++){
                ratingStars += '<i class="fa fa-star"></i> ';
              }
              for (let j = 5 - cursor.value.rating; j > 0; j--){
                ratingStars += '<i class="fa fa-star-o"></i> ';
              }
  
              let tags = '';
              for (let k = 0; k < cursor.value.tag.length; k++){
                tags += `<span>${cursor.value.tag[k]}</span>`;
              } 
  
              
              const foodCard = document.createElement("div");
              foodCard.className = 'col-12 col-md-4 col-lg-3';
              foodCard.innerHTML = `<div class="card" data-food-id="${cursor.value.id}" style="cursor: pointer;">
                  <img src="${cursor.value.imgSrc}" class="card-img-top img-fluid" alt="">
                  <div class="card-body">
                      <h5 class="card-title">${cursor.value.foodName}</h5>
                      <p class="rating">Rating
                          <span class="rating-stars">
                            ${ratingStars}
                          </span>
                      </p>
                      <p class="price">Price
                          <span class="price-amount">${cursor.value.price}.00</span>
                      </p>
                      <p class="tags">
                            ${tags}  
                      </p>
                  </div>
              </div>
              <p class="text-center action-btns">
                      <button class="heart-btn"><i class="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
              </p>`;
              cards.appendChild(foodCard);
              cursor.continue();
            }
        }
      };
    
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