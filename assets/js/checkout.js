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
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
