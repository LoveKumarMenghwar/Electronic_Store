const productDetailsContainer = document.querySelector("#product-details");
const selectedProductId = localStorage.getItem("selectedProduct");

fetch(`https://dummyjson.com/products/${selectedProductId}`)
  .then(response => response.json())
  .then(product => {
    productDetailsContainer.innerHTML = `
      <div class="details-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      </div>
    `;
  });

function goBack() {
  window.location.href = "index.html";
}
