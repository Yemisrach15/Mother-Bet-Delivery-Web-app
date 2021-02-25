var addFavorite = [];
var itemAmount = document.querySelector('.item-amount');
var addAmount = document.querySelectorAll('.add-amount');
var minusAmount = document.querySelectorAll('.minus-amount');
var removeItem = document.querySelectorAll('.remove-item');
const checkoutBox = document.querySelector('.checkout-box ul');
var heartBtn;


cards.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('card')){
        addToCheckout(e);
    } else {
        heartBtn = cards.querySelectorAll('.heart-btn');
        heartBtn.forEach((btn) => {
            btn.addEventListener('click', addToFavorite);
        })
    }
});

function addToFavorite(e) {
    console.log(e.target.parentElement);
    var foodId = e.target.parentElement.parentElement.parentElement.querySelector('.card').getAttribute('data-food-id');
    foodId = parseInt(foodId);
    if (!addFavorite.includes(foodId)) {
        addFavorite.push(foodId);
        e.target.parentElement.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
    } else {
        addFavorite.splice(addFavorite.indexOf(foodId), 1);
        e.target.parentElement.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
    }
    
}

function addToCheckout(event) {
    console.log(event.target.parentElement);
    var itemWrapper = document.createElement('li');
    itemWrapper.className = 'list-group-item list-group-item-action flex-column';
    var newItem = `<div class="d-flex w-100" data-food-id=${event.target.parentElement.getAttribute('data-food-id')}>
      <div>${event.target.parentElement.querySelector('.card-title').textContent}</div>
      <div  class="ml-auto d-flex">
        <div class="mr-2 border-right">  
          <span class="item-amount">1</span>
          <button class="btn b-none minus-amount"><i class="fa fa-minus color-orange" aria-hidden="true"></i></button>
          <button class="btn b-none add-amount"><i class="fa fa-plus color-orange" aria-hidden="true"></i></button>
        </div>
        <div class="mr-2 border-right text-center p-2 price-amount">${event.target.parentElement.querySelector('.price-amount').textContent} birr</div>
        <button class="btn b-none remove-item"><i class="fa fa-minus-circle color-red" aria-hidden="true"></i></button>
        </div>
      </div>`;
      itemWrapper.innerHTML = newItem;
      checkoutBox.appendChild(itemWrapper);

      addListeners();
}

function addListeners () {
    addAmount = document.querySelectorAll('.add-amount');
    minusAmount = document.querySelectorAll('.minus-amount');
    removeItem = document.querySelectorAll('.remove-item');

    addAmount.forEach((addAmountBtn) => {
        addAmountBtn.addEventListener('click', (e) => {
            itemAmount = e.target.parentElement.parentElement.querySelector('.item-amount');
            itemAmount.textContent = Number(itemAmount.textContent) + 1;
        })
    })

    minusAmount.forEach((minusAmountBtn) => {
        minusAmountBtn.addEventListener('click', (e) => {
            itemAmount = e.target.parentElement.parentElement.querySelector('.item-amount');
            itemAmount.textContent = Number(itemAmount.textContent) - 1;
        })
    })

    removeItem.forEach((removeItemBtn) => {
        removeItemBtn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
        })
    })
}
const ordersView = document.querySelector('.order-list');
const totalPriceView = document.getElementById('total-price');
let totalPrice = 0;
var orders;

document.addEventListener('DOMContentLoaded', () => {

    orders = JSON.parse(localStorage.getItem('orders'));
    let ordersID = [];
    orders.forEach((order) => {
        ordersID.push(order.foodId);
    })

    let foodDB = indexedDB.open('foods', 1);

    foodDB.onsuccess = function() {
        db = foodDB.result;
        displayOrders();
    }

    function displayOrders() {

        let foodStore = db.transaction('foods').objectStore('foods');
  
        foodStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
  
            if (cursor) {  

                if(ordersID.includes(cursor.value.id)) {
                    const orderRow = document.createElement("tr");
                    var quantity = orders[ordersID.indexOf(cursor.value.id)].itemAmount;
                    orderRow.innerHTML = `
                                <td>${cursor.value.foodName}</td>
                                <td>${quantity}</td>
                                <td class = 'total-price'>${cursor.value.price * quantity} birr</td>`;
                    ordersView.appendChild(orderRow);    

                    // calculate and display total price
                    totalPrice += (cursor.value.price * quantity);
                    totalPriceView.textContent = totalPrice + ' birr';
                }
            
                cursor.continue();
            }
        }
    };    
})