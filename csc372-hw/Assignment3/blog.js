document.addEventListener("DOMContentLoaded", () => {
    const dishes = document.querySelectorAll(".dish");
    const selectedDishSection = document.getElementById("selected-dish");
    const dishName = document.getElementById("dish-name");
    const dishPrice = document.getElementById("dish-price");
    
    dishes.forEach(dish => {
        dish.addEventListener("click", () => {
            // Remove selected class from all images
            dishes.forEach(img => img.classList.remove("selected"));
            
            // Add selected class to clicked image
            dish.classList.add("selected");
            
            // Update selected dish section
            dishName.textContent = dish.dataset.name;
            dishPrice.textContent = `$${dish.dataset.price}`;
            
            // Show selected dish section
            selectedDishSection.style.display = "block";
        });
    });
});
