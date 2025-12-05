// Resonsive nav
function toggleMenu() {
    document.querySelector(".navlist").classList.toggle("active");
}

document.querySelectorAll(".navlist a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".navlist").classList.remove("active");
    });
});

// Shopping Cart
const cartIcon = document.querySelector('.fa-bag-shopping');
const wholeCartWindow = document.querySelector('.whole-cart-window');

// Show cart
cartIcon.addEventListener("mouseover", () => {
    wholeCartWindow.classList.remove("hide");
});

wholeCartWindow.addEventListener("mouseover", () => {
    wholeCartWindow.classList.remove("hide");
});

// Hide cart
cartIcon.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!wholeCartWindow.matches(":hover")) {
            wholeCartWindow.classList.add("hide");
        }
    }, 100);
});

wholeCartWindow.addEventListener("mouseleave", () => {
    wholeCartWindow.classList.add("hide");
});

// Add to cart
const cards = document.querySelectorAll('.card');
const cart = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const totalElement = document.getElementById('total');
const selectedItems = {};

function handleCardClick(event) {
    const card = event.currentTarget;
    const itemId = card.id;
    const itemName = card.querySelector('.title').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent);

    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    } else {
        selectedItems[itemId] = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            count: 1,
            image: card.querySelector('img').src
        };
    }
    updateCart();
}

function updateCart() {
    cart.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    for (const itemId in selectedItems) {
        const item = selectedItems[itemId];        
        totalItems += item.count;

        total += item.price * item.count;

        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');

        const itemInfo = document.createElement('span');
        itemInfo.classList.add('item-info');
        itemInfo.textContent = `${item.name} - $${(item.price * item.count).toFixed(2)}`;

        // Quatity controls (+ and -)
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-controls');

        const subtractButton = document.createElement('button');
        subtractButton.textContent = '-';

        const quantityText = document.createElement('span');
        quantityText.textContent = item.count;

        const addButton = document.createElement('button');
        addButton.textContent = '+';

        // attach listeners
        addButton.addEventListener('click', () => addItem(itemId));
        subtractButton.addEventListener('click', () => removeItem(itemId));

        // assemble quantity controls
        quantityContainer.appendChild(subtractButton);
        quantityContainer.appendChild(quantityText);
        quantityContainer.appendChild(addButton);

        // assemble final list item
        listItem.appendChild(itemInfo);
        listItem.appendChild(quantityContainer);

        cart.appendChild(listItem);
    }

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = totalItems;

    localStorage.setItem("cartData", JSON.stringify(selectedItems));
    localStorage.setItem("cartTotal", total.toFixed(2));
}

function addItem(id) {
    selectedItems[id].count++;
    updateCart();   
}

function removeItem(id) {
    selectedItems[id].count--;
    if (selectedItems[id].count <= 0) delete selectedItems[id];
    updateCart();
}

cards.forEach(card => card.addEventListener('click', handleCardClick));

// go to checkout.html when clicking checkout-btn
document.getElementById("checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html";
});


