var db;

var users = [
    { id: 1, userName: "John Doe", password: "123" },
    { id: 2, userName: "Jane Doe", password: "456" },
];

var foodList = [
    { id: 1, foodName: "Ertib", tag: ["fasting", "fast-food", "popular"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 25.00, description: "Very delicious"}, 
    { id: 2, foodName: "Firfir", tag: ["fasting"], imgSrc: "assets/img/photo_2021-02-04_21-56-10.jpg", rating: 4, price: 20.00, description: "tastes like home"}
];

document.addEventListener('DOMContentLoaded', () => {

    // create the database
    let userDB = indexedDB.open('users', 1);
    
    userDB.onsuccess = function() {
        db = userDB.result;
        populateUserData();
    }

    let foodDB = indexedDB.open('foods', 1);

    foodDB.onsuccess = function() {
        db = foodDB.result;
        populateFoodData();
    }

    userDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function() {
            console.log('Error loading database.');
        };

        var usersStore = db.createObjectStore('users', {keyPath: 'id'});
        usersStore.createIndex('userName', 'userName', {unique: false});
        usersStore.createIndex('password', 'password', {unique: false});

    }

    foodDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function(){
            console.log('Error loading database.');
        };

        var foodStore = db.createObjectStore('foods', {keyPath: 'id'});
        foodStore.createIndex('foodName', 'foodName', {unique: false});
        foodStore.createIndex('imgSrc', 'imgSrc', {unique: false});
        foodStore.createIndex('rating', 'rating', {unique: false});
        foodStore.createIndex('price', 'price', {unique: false});
        foodStore.createIndex('description', 'description', {unique: false});

    }

    function populateFoodData() {

        var foodTransaction = db.transaction(['foods'], 'readwrite');
        var foodStore = foodTransaction.objectStore('foods');
        for(let i = 0; i < foodList.length ; i++) {
            var request = foodStore.put(foodList[i]);
          };
      
          foodTransaction.oncomplete = function() {
            console.log('Food table Populated');
          };
    };

    function populateUserData() {
        var userTransaction = db.transaction(['users'], 'readwrite');
        var userStore = userTransaction.objectStore('users');
        for(let i = 0; i < users.length ; i++) {
          var request = userStore.put(users[i]);
        };
    
        userTransaction.oncomplete = function() {
          console.log('User table Populated');
        };

    }
});