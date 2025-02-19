document.addEventListener("DOMContentLoaded", () => {
    const dishList = document.querySelectorAll("#dish-list li");
    const selectedDishes = document.getElementById("selected-dishes");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;
    let mealPlan = {};

    dishList.forEach(dish => {
        dish.querySelector(".add").addEventListener("click", () => {
            const name = dish.getAttribute("data-name");
            const price = parseFloat(dish.getAttribute("data-price"));

            if (!mealPlan[name]) {
                mealPlan[name] = { price, quantity: 1 };
                const listItem = document.createElement("li");
                listItem.setAttribute("data-name", name);
                listItem.innerHTML = `${name} - $${(price * mealPlan[name].quantity).toFixed(2)} 
                    <button class="increase">+</button>
                    <span class="quantity">1</span>
                    <button class="decrease">-</button>
                    <button class="remove">Remove</button>`;
                selectedDishes.appendChild(listItem);

                listItem.querySelector(".increase").addEventListener("click", () => updateQuantity(name, 1, listItem));
                listItem.querySelector(".decrease").addEventListener("click", () => updateQuantity(name, -1, listItem));
                listItem.querySelector(".remove").addEventListener("click", () => removeDish(name, listItem));
            } else {
                const listItem = document.querySelector(`#selected-dishes li[data-name='${name}']`);
                updateQuantity(name, 1, listItem);
            }
            updateTotal();
        });
    });

    function updateQuantity(name, change, listItem) {
        if (mealPlan[name]) {
            mealPlan[name].quantity += change;
            if (mealPlan[name].quantity <= 0) {
                removeDish(name, listItem);
            } else {
                listItem.querySelector(".quantity").textContent = mealPlan[name].quantity;
                listItem.innerHTML = `${name} - $${(mealPlan[name].price * mealPlan[name].quantity).toFixed(2)} 
                    <button class="increase">+</button>
                    <span class="quantity">${mealPlan[name].quantity}</span>
                    <button class="decrease">-</button>
                    <button class="remove">Remove</button>`;
                
                listItem.querySelector(".increase").addEventListener("click", () => updateQuantity(name, 1, listItem));
                listItem.querySelector(".decrease").addEventListener("click", () => updateQuantity(name, -1, listItem));
                listItem.querySelector(".remove").addEventListener("click", () => removeDish(name, listItem));
            }
            updateTotal();
        }
    }

    function removeDish(name, element) {
        delete mealPlan[name];
        element.remove();
        updateTotal();
    }

    function updateTotal() {
        totalPrice = Object.values(mealPlan).reduce((sum, dish) => sum + dish.price * dish.quantity, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});
