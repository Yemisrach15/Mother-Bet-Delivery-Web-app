var db;
const cards = document.querySelector(".cards");
const filters = document.querySelector('.filters ul');


document.addEventListener('DOMContentLoaded', () => {

    let foodDB = indexedDB.open('foods', 1);

    foodDB.onsuccess = function() {
        db = foodDB.result;
        displayMenu();
    }

    function displayMenu() {

      let foodStore = db.transaction('foods').objectStore('foods').index('price');

      foodStore.openCursor().onsuccess = function(e) {
          let cursor = e.target.result;

          if (cursor) {

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
                    <p class="price">Price
                        <span class="price-amount">${cursor.value.price}.00</span>
                    </p>
                    <p class="tags">
                          ${tags}  
                    </p>
                </div>
            </div>`;
            cards.appendChild(foodCard);
            cursor.continue();
          }
      }
    };

    filters.addEventListener('click', filterFunction);

    function filterFunction(event) {
		while (cards.firstChild) {   
			cards.removeChild(cards.firstChild);
		};

		let prevFilter = filters.querySelector('.active-filter');
		prevFilter.classList.remove('active-filter');

		event.target.classList.add('active-filter');
		// console.log(event.target.textContent.toLowerCase());

		let foodStore = db.transaction('foods').objectStore('foods').index('price');

		foodStore.openCursor().onsuccess = function(e) {
			if (event.target.textContent.toLowerCase() == 'all') {
				displayMenu();
				return;
			}
			let cursor = e.target.result;

			if (cursor) {

				if (cursor.value.tag.includes(event.target.textContent.toLowerCase())) {
					// console.log(cursor.value.foodName + " includes " + event.target.textContent + "  " + cursor.value.tag);
					// console.log(cursor.value.foodName);

					let tags = '';
					for (let k = 0; k < cursor.value.tag.length; k++){
						tags += `<span>${cursor.value.tag[k]}</span>`;
					} 

					const foodCard = document.createElement("div");
					foodCard.className = 'col-12 col-md-4 col-lg-3';
					foodCard.innerHTML = `<a href="">
					<div class="card">
						<img src="${cursor.value.imgSrc}" class="card-img-top img-fluid" alt="">
						<div class="card-body">
							<h5 class="card-title">${cursor.value.foodName}</h5>
							<p class="price">Price
								<span class="price-amount">${cursor.value.price}.00</span>
							</p>
							<p class="tags">
									${tags}  
							</p>
						</div>
					</div>
					</a>`;
					cards.appendChild(foodCard);
				}

				cursor.continue();
		}
    }
}
})