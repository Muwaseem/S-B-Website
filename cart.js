// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Count
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => {

        return sum + item.quantity;

    }, 0);

    cartCount.textContent = totalItems;

}

// Add To Cart
function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    renderCart();

    alert(name + " Added To Cart!");

}

// Render Cart
function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your Cart is Empty 😔</h3>";

        cartTotal.textContent = "0";

        return;

    }

    cart.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h3>${item.name}</h3>

            <p>Price: Rs. ${item.price}</p>

            <p>Quantity: ${item.quantity}</p>

            <button onclick="increaseQty(${index})">➕</button>

            <button onclick="decreaseQty(${index})">➖</button>

            <button onclick="removeItem(${index})">❌ Remove</button>

            <hr>

        </div>

        `;

    });

    cartTotal.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Increase
function increaseQty(index){

    cart[index].quantity++;

    renderCart();

    updateCartCount();

}

// Decrease
function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    renderCart();

    updateCartCount();

}

// Remove
function removeItem(index){

    cart.splice(index,1);

    renderCart();

    updateCartCount();

}

// WhatsApp Order
const orderNowBtn = document.getElementById("orderNowBtn");

if(orderNowBtn){

    orderNowBtn.onclick = function(){

        if(cart.length === 0){

            alert("Your cart is empty!");

            return;

        }

        let total = 0;

        let message = "🛒 *S&B Fresh & Crispy Order*%0A%0A";

        cart.forEach((item,index)=>{

            const subtotal = item.price * item.quantity;

            total += subtotal;

            message += `${index+1}. ${item.name}%0A`;

            message += `Qty: ${item.quantity}%0A`;

            message += `Rs. ${subtotal}%0A%0A`;

        });

        message += `💰 Total: Rs. ${total}`;

        window.open(

            "https://wa.me/923497422079?text=" + message,

            "_blank"

        );

    }

}

// Initial Load
renderCart();

updateCartCount();