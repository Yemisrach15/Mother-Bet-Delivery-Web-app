var db;
var cards = document.querySelector(".cards");

// var users = [
//     { id: 1, userName: "John Doe", password: "123" },
//     { id: 2, userName: "Jane Doe", password: "456" },
// ];

var foodList = [
    { id: 1, foodName: "Ertib", tag: ["fasting", "fast-food"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 25.00, description: "Very delicious"}, 
    { id: 2, foodName: "Firfir", tag: ["fasting"], imgSrc: "assets/img/photo_2021-02-04_21-56-10.jpg", rating: 4, price: 20.00, description: "tastes like home"},

]

document.addEventListener('DOMContentLoaded', () => {

    // create the database 
    let foodDB = indexedDB.open('foods', 1);

    foodDB.onsuccess = function() {
        db = foodDB.result;
        populateData();
        displayMenu();
    }

    foodDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function(){
            console.log('Error loading database.');
        };

        // var usersStore = db.createObjectStore('users', {keyPath: 'id'});
        // usersStore.createIndex('userName', 'userName', {unique: false});
        // usersStore.createIndex('password', 'password', {unique: false});

        var foodStore = db.createObjectStore('foods', {keyPath: 'id'});
        foodStore.createIndex('foodName', 'foodName', {unique: false});
        foodStore.createIndex('imgSrc', 'imgSrc', {unique: false});
        foodStore.createIndex('rating', 'rating', {unique: false});
        foodStore.createIndex('price', 'price', {unique: false});
        foodStore.createIndex('description', 'description', {unique: false});

    }

    function populateData() {
        // var userTransaction = db.transaction(['users'], 'readwrite');
        // var userStore = userTransaction.objectStore('users');
        // for(let i = 0; i < users.length ; i++) {
        //   var request = userStore.put(users[i]);
        // };
    
        // userTransaction.oncomplete = function() {
        //   console.log('User table Populated');
        // };

        var foodTransaction = db.transaction(['foods'], 'readwrite');
        var foodStore = foodTransaction.objectStore('foods');
        for(let i = 0; i < foodList.length ; i++) {
            var request = foodStore.put(foodList[i]);
          };
      
          foodTransaction.oncomplete = function() {
            console.log('Food table Populated');
          };
    };

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

            console.log(ratingStars);

            const foodCard = document.createElement("div");
            foodCard.className = 'col-12 col-md-4 col-lg-3';
            foodCard.innerHTML = `<a href="">
            <div class="card">
                <img src="${cursor.value.imgSrc}" class="card-img-top img-fluid" alt="">
                <div class="card-body">
                    <h5 class="card-title">${cursor.value.foodName}</h5>
                    <p class="rating">Rating
                        <span class="rating-stars">
                          ${ratingStars}
                        </span>
                    </p>
                    <p class="price">Price
                        <span class="price-amount">${cursor.value.price}</span>
                    </p>
                    <p class="tags">
                          ${tags}  
                    </p>
                </div>
            </div>
            </a>`;
            cards.appendChild(foodCard);
            cursor.continue();
          }
      }
  }
})