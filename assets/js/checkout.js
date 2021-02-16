var itemAmount = document.querySelector('.item-amount');
var addAmount = document.querySelectorAll('.add-amount');
var minusAmount = document.querySelectorAll('.minus-amount');
var removeItem = document.querySelectorAll('.remove-item');
const checkoutBox = document.querySelector('.checkout-box ul');
const card = document.querySelector(".card");


cards.addEventListener('click', addToCheckout);

function addToCheckout(event) {
    // console.log(event.target.parentElement);
    var itemWrapper = document.createElement('li');
    itemWrapper.className = 'list-group-item list-group-item-action flex-column';
    var newItem = `<div class="d-flex w-100">
      <div>${event.target.parentElement.querySelector('.card-title').textContent}</div>
      <div  class="ml-auto d-flex">
        <div class="mr-2 border-right">  
          <span class="item-amount">1</span>
          <button class="btn b-none minus-amount"><i class="fa fa-minus color-orange" aria-hidden="true"></i></button>
          <button class="btn b-none add-amount"><i class="fa fa-plus color-orange" aria-hidden="true"></i></button>
        </div>
        <div class="mr-2 border-right text-center p-2">${event.target.parentElement.querySelector('.price-amount').textContent} birr</div>
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