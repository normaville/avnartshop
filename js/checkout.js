// Checkout.html page
document.addEventListener("DOMContentLoaded", () => {
    const cartWrapper = document.getElementById("cart-page-wrapper");
    const emptyMessage = document.querySelector(".cart-empty-message");
    // const pageSubtotal = document.getElementById("pageSubtotal");

    const savedCart = JSON.parse(localStorage.getItem("cartData")) || {};
    const taxRate = 0.07; //7% tax rate for Orlando
    // const savedTotal = localStorage.getItem("cartTotal") || "0.00";

    

    // Calculations
    function updateCartSummary(){
        let subtotal = 0;

        for (const id in savedCart) {
            const item = savedCart[id];
            subtotal += item.price * item.count;
        }

        // tax
        const tax = subtotal * taxRate;

        // total 
        const total = subtotal + tax;

        document.getElementById("pageSubtotal").textContent = subtotal.toFixed(2);
        document.getElementById("pageTax").textContent = tax.toFixed(2);
        document.getElementById("pageTotal").textContent = total.toFixed(2);
    }

    updateCartSummary();

    cartWrapper.innerHTML = ""; // Clear default template items

    let itemCount = 0;

    for (const id in savedCart) {
        const item = savedCart[id];
        itemCount += item.count;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-page-item", "flex");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="">
            <div class="details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.count}</p>
            </div>
            <button class="remove-btn" data-id="${id}">Remove</button>
        `;

        cartWrapper.appendChild(cartItem);
    }

    if (itemCount === 0) {
        emptyMessage.classList.remove("hide");
    }

    // pageSubtotal.textContent = `Subtotal: $${savedTotal}`;
    
});

// Remove button logic
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("remove-btn")) return;

    const id = e.target.dataset.id;
    let savedCart = JSON.parse(localStorage.getItem("cartData")) || {};

    //savedCart is not an array, it's an object
    delete savedCart[id];

    localStorage.setItem("cartData", JSON.stringify(savedCart));

    location.reload();

});

document.getElementById("checkout").addEventListener("click", () => {
    alert("Thank you for your purchase!");
});
