var db;

var users = [
    { id: 1, userName: "John Doe", password: "123", favorites: [1, 2], phoneNumber: '0900010203' },
    { id: 2, userName: "Jane Doe", password: "456", favorites: [4, 5, 6, 2, 9, 11], phoneNumber: '0901020304'},
];

var foodList = [
    { id: 1, foodName: "Ertib", tag: ["fasting", "fast-food", "popular"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 25.00}, 
    { id: 2, foodName: "Firfir", tag: ["fasting", "popular"], imgSrc: "assets/img/photo_2021-02-04_21-56-13.jpg", rating: 4, price: 20.00}, 
    { id: 3, foodName: "Pasta", tag: ["vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00}, 
    { id: 4, foodName: "Pasta with veggies", tag: ["fasting", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 35.00},
    { id: 5, foodName: "Shiro", tag: ["fasting", "popular", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00},
    { id: 6, foodName: "Tegabino", tag: ["fasting", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 35.00},
    { id: 7, foodName: "Normal Ertib", tag: ["fasting", "fast-food", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 25.00},
    { id: 8, foodName: "Ertib with avocado", tag: ["fasting", "vegan", "fast-food"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 35.00},
    { id: 9, foodName: "Ertib with egg", tag: ["fast-food"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 35.00},
    { id: 10, foodName: "Ertib with ketchup", tag: ["fasting", "fast-food"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00},
    { id: 11, foodName: "Rice", tag: ["fasting", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00},
    { id: 12, foodName: "Timatim Lebleb", tag: ["fasting", "vegan"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00},
    { id: 13, foodName: "Beyaynetu", tag: ["fasting", "vegan", "popular"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 30.00},
    { id: 14, foodName: "Kuanta Firfir", tag: ["popular", "meat"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 40.00},
    { id: 15, foodName: "Tibs", tag: ["meat"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 50.00},
    { id: 16, foodName: "Enkulal", tag: ["popular"], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 35.00},
    { id: 17, foodName: "Special", tag: [], imgSrc: "assets/img/photo_2021-02-04_21-56-04.jpg", rating: 5, price: 60.00},
];

var orders = [];

document.addEventListener('DOMContentLoaded', () => {

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

    let orderDB = indexedDB.open('orders', 1);

    orderDB.onsuccess = function() {
        db = orderDB.result;
        populateOrderData();
    }

    userDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function() {
            console.log('Error loading database.');
        };

        var usersStore = db.createObjectStore('users', {keyPath: 'id', autoIncrement: true});
        usersStore.createIndex('userName', 'userName', {unique: false});
        usersStore.createIndex('password', 'password', {unique: false});
        usersStore.createIndex('favorites', 'favorites', {unique: false});
        usersStore.createIndex('phoneNumber', 'phoneNumber', {unique: false});

    }

    foodDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function(){
            console.log('Error loading database.');
        };

        var foodStore = db.createObjectStore('foods', {keyPath: 'id', autoIncrement: true});
        foodStore.createIndex('foodName', 'foodName', {unique: false});
        foodStore.createIndex('imgSrc', 'imgSrc', {unique: false});
        foodStore.createIndex('price', 'price', {unique: false});
        foodStore.createIndex('tag', 'tag', {unique: false});


    }

    orderDB.onupgradeneeded = function(event) {
        var db = event.target.result;

        db.onerror = function(){
            console.log('Error loading database.');
        };

        var orderStore = db.createObjectStore('orders', {keyPath: 'id', autoIncrement: true});
        orderStore.createIndex('customerID', 'customerID', {unique: false});
        orderStore.createIndex('customerPhoneNo', 'customerPhoneNo', {unique: false});
        orderStore.createIndex('orderList', 'orderList', {unique: false});
        orderStore.createIndex('totalPrice', 'totalPrice', {unique: false});
        orderStore.createIndex('delivered', 'delivered', {unique: false});


    }

    function populateFoodData() {

        var foodTransaction = db.transaction(['foods'], 'readwrite');
        var foodStore = foodTransaction.objectStore('foods');
        for(let i = 0; i < foodList.length ; i++) {
            var request = foodStore.put(foodList[i]);
        };

        foodTransaction.oncomplete = function() {
        // console.log('Food table Populated');
        };
    };

    function populateUserData() {
        var userTransaction = db.transaction(['users'], 'readwrite');
        var userStore = userTransaction.objectStore('users');
        for(let i = 0; i < users.length ; i++) {
          var request = userStore.put(users[i]);
        };
    
        userTransaction.oncomplete = function() {
        //   console.log('User table Populated');
        };

    }
});


var navBar = document.querySelector('.fixed-nav');
window.onscroll = function () { 
    "use strict";
    if (document.body.scrollTop >= 120 || document.documentElement.scrollTop >= 120 )    {
        navBar.classList.add("nav-colored");
        navBar.classList.remove("nav-transparent");
    } 
    else {
        navBar.classList.add("nav-transparent");
        navBar.classList.remove("nav-colored");
    }
};