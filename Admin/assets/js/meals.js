const cardColumns = document.querySelector('.card-columns');

let dbRequest = indexedDB.open('foods', 1);

dbRequest.onsuccess = function(event) {
    db = dbRequest.result;
    displayMeals();
}

function displayMeals() {
    let foodStore = db.transaction('foods').objectStore('foods');

    foodStore.openCursor().onsuccess = function(e) {
        let cursor = e.target.result;

        if(cursor) {
            let mealCard = document.createElement('div');
            mealCard.setAttribute('style', "border: 5px solid grey; padding: 1em");
            mealCard.className = 'card border-2 border-light';

            let tags = '';
            for (let k = 0; k < cursor.value.tag.length; k++) {
                tags += `<span>${cursor.value.tag[k]}</span>`;
            }

            let meal = `<div class="d-flex justify-content-between">
                    <h4 class="card-title">${cursor.value.foodName}</h4>
                    <h4 class="color-orange">${cursor.value.price}</h5>
                </div>
                <p class="card-text">
                    ${tags}
                </p>
            
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger">Remove</button>
                    <button class="btn orange-bg">Edit</button>
                </div>
            </div>`;
            mealCard.innerHTML = meal
            cardColumns.appendChild(mealCard);
            cursor.continue();
        }
    }
}