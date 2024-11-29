const cartContent = document.querySelector("#cart-content");
const totalPriceContainer = document.querySelector("#total-price");
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

function renderCart() {
  const totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPriceContainer.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

  cartContent.innerHTML = "";
  cartData.forEach((item, idx) => {
    cartContent.innerHTML += `
      <div class="cart-item">
        <img src="${item.thumbnail}" alt="${item.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
        <h2>${item.title}</h2>
        <p>Price: $${item.price}</p>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button onclick="decrementQuantity(${idx})">-</button>
          <p>Quantity: <span id="quantity-${idx}">${item.quantity}</span></p>
          <button onclick="incrementQuantity(${idx})">+</button>
        </div>
        <button onclick="removeFromCart(${idx})">Remove</button>
      </div>
    `;
  });
}

function incrementQuantity(index) {
  cartData[index].quantity++;
  localStorage.setItem("cartData", JSON.stringify(cartData));
  renderCart();
}

function decrementQuantity(index) {
  if (cartData[index].quantity > 1) {
    cartData[index].quantity--;
    localStorage.setItem("cartData", JSON.stringify(cartData));
    renderCart();
  }
}

function removeFromCart(index) {
  cartData.splice(index, 1);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  renderCart();
}

function goBack() {
  window.location.href = "index.html";
}

renderCart();
