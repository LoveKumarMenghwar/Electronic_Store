const productContainer = document.querySelector("#product-container");
const cartCountElement = document.querySelector("#cart-count");
let cartItems = JSON.parse(localStorage.getItem("cartData")) || [];

updateCartCount();

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    data.products.forEach((product, index) => {
      productContainer.innerHTML += `
        <div class="product-card">
          <img src="${product.thumbnail}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${index})">Add to Cart</button>
          <button onclick="viewDetails(${product.id})">View Details</button>
        </div>
      `;
    });
    localStorage.setItem("products", JSON.stringify(data.products));
  });

function addToCart(index) {
  const products = JSON.parse(localStorage.getItem("products"));
  const product = products[index];

  const existingIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingIndex === -1) {
    product.quantity = 1;
    cartItems.push(product);
  } else {
    cartItems[existingIndex].quantity++;
  }

  localStorage.setItem("cartData", JSON.stringify(cartItems));
  // alert(`${product.title} added to cart!`);
  updateCartCount();
}

function viewDetails(productId) {
  localStorage.setItem("selectedProduct", productId);
  window.location.href = "details.html";
}

function updateCartCount() {
  cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

function goToCart() {
  window.location.href = "cart.html";
}
