const restaurants = {
    pizza: {
        name: "Pizza Palace",
        menu: [
            ["Margherita Pizza", 250, "Cheese and tomato pizza"],
            ["Chicken Pizza", 350, "Chicken pizza"],
            ["Veggie Pizza", 300, "Vegetable pizza"]
        ]
    },

    indian: {
        name: "Spice Kitchen",
        menu: [
            ["Chicken Biryani", 220, "Chicken biryani"],
            ["Paneer Butter Masala", 180, "Paneer gravy"],
            ["Veg Meals", 150, "South Indian meals"]
        ]
    },

    burger: {
        name: "Burger House",
        menu: [
            ["Chicken Burger", 180, "Chicken burger"],
            ["Veg Burger", 140, "Vegetable burger"],
            ["French Fries", 100, "Crispy fries"]
        ]
    }
};

let cart = [];

function showMenu(id) {
    let r = restaurants[id];
    document.getElementById("restaurant-name").innerText = r.name + " - Menu";

    let menu = document.getElementById("menu-container");
    menu.innerHTML = "";

    r.menu.forEach(item => {
        menu.innerHTML += `
            <div class="menu-item">
                <div>
                    <h3>${item[0]}</h3>
                    <p>${item[2]}</p>
                </div>
                <div>
                    ₹${item[1]}
                    <button onclick="addToCart('${item[0]}',${item[1]})">
                        Add
                    </button>
                </div>
            </div>
        `;
    });
}

function addToCart(name, price) {
    let item = cart.find(x => x.name == name);

    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });

    updateCart();
}

function updateCart() {
    let box = document.getElementById("cart-items");
    let total = 0, count = 0;

    box.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        count += item.qty;

        box.innerHTML += `
            <div class="cart-item">
                ${item.name} - ₹${item.price * item.qty}
                <button onclick="changeQty(${i},-1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${i},1)">+</button>
            </div>
        `;
    });

    if (!cart.length) box.innerHTML = "Your cart is empty.";

    document.getElementById("cart-total").innerText = total;
    document.getElementById("cart-count").innerText = count;
}

function changeQty(i, n) {
    cart[i].qty += n;

    if (cart[i].qty <= 0)
        cart.splice(i, 1);

    updateCart();
}

function checkout() {
    if (!cart.length)
        return alert("Your cart is empty!");

    alert("Order placed successfully!");
    cart = [];
    updateCart();
}

updateCart();