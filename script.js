let cart = JSON.parse(localStorage.getItem("cart")) || [];
// ======================================
// S&B Fresh & Crispy - script.js
// ======================================


// Elements
const buttons = document.querySelectorAll(".menu-card button");
const cartCount = document.getElementById("cart-count");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");

// ==========================
// Open Cart
// ==========================

if (openCart) {

    openCart.addEventListener("click", function (e) {

        e.preventDefault();

        cartDrawer.classList.add("active");

    });

}

// ==========================
// Close Cart
// ==========================

if (closeCart) {

    closeCart.addEventListener("click", function () {

        cartDrawer.classList.remove("active");

    });

}

// ==========================
// Add To Cart
// ==========================

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".menu-card");

        const itemName = card.querySelector("h3").textContent;

        const itemPrice = card.querySelector("p").textContent;

       

        const existingItem = cart.find(item => item.name === itemName);

if (existingItem) {

    existingItem.quantity++;

} else {

    cart.push({

        name: itemName,

        price: itemPrice,

        quantity: 1

    });

}

renderCart();

if (cartCount) {

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

}

        if (cartCount) {

            cartCount.textContent = cart.length;

        }

        renderCart();

    });

});

// ==========================
// Render Cart
// ==========================

function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

       cartItems.innerHTML += `

<div class="cart-item">

    <div>

        <h4>${item.name}</h4>

        <p>Rs. ${item.price} × ${item.quantity}</p>

    </div>

    <div class="cart-actions">

        <button class="minus" onclick="decreaseQty(${index})">➖</button>

        <button class="plus" onclick="increaseQty(${index})">➕</button>

        <button class="remove" onclick="removeItem(${index})">❌</button>

    </div>

</div>

`;

        cartTotal.textContent = "0";

        return;

    }

    cart.forEach((item, index) => {

        const price = parseInt(item.price.replace(/[^\d]/g, ""));

        total += price * (item.quantity || 1);

        cartItems.innerHTML += `

            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>${item.price} × ${item.quantity}</p>

<button onclick="decreaseQty(${index})">➖</button>

<button onclick="increaseQty(${index})">➕</button>

<button onclick="removeItem(${index})">❌ Remove</button>


                <hr>

            </div>

        `;

    });

    cartTotal.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));

}

// ==========================
// Remove Item
// ==========================

function removeItem(index) {

    cart.splice(index, 1);

    cartCount.textContent = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
);

    renderCart();

}

// ==========================
// Search Function
// ==========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".menu-card");

        cards.forEach((card) => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ==========================
// Category Filter
// ==========================

function filterMenu(category) {

    const cards = document.querySelectorAll(".menu-card");

    cards.forEach((card) => {

        if (

            category === "all" ||

            card.dataset.category === category

        ) {

            card.style.display = "";

        }

        else {

            card.style.display = "none";

        }

    });

}


// ==========================
// Order Now (WhatsApp)
// ==========================



const orderNowBtn = document.getElementById("orderNowBtn");

if (orderNowBtn) {

    orderNowBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        let total = 0;

        let message = "Assalam o Alaikum!\n\n";
        message += "🛒 S&B Fresh & Crispy Order\n\n";

        cart.forEach((item, index) => {

            const price = parseInt(item.price.replace(/[^\d]/g, ""));

            const qty = item.quantity || 1;

            const subtotal = price * qty;

            total += subtotal;

            message += `${index + 1}. ${item.name}\n`;
            message += `Quantity: ${qty}\n`;
            message += `Price: Rs. ${subtotal}\n\n`;

        });

        message += "-------------------------\n";
        message += `💰 Total Amount: Rs. ${total}\n\n`;
        message += "Please confirm my order.";

        const url =
            "https://wa.me/923497422079?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank");

    });

}


function increaseQty(index){

    cart[index].quantity++;

    renderCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    renderCart();

}

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: "Rs. " + price,

            quantity: 1

        });

    }

    renderCart();

    cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
localStorage.setItem("cart", JSON.stringify(cart));
}
renderCart();

cartCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
);
const overlay = document.getElementById("cartOverlay");

if (overlay) {

    overlay.addEventListener("click", function(){

        cartDrawer.classList.remove("active");

        overlay.classList.remove("active");

    });

}
cartDrawer.classList.add("active");

overlay.classList.add("active");