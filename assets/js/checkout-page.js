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