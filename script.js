let products = JSON.parse(localStorage.getItem("products")) || [];
// Search Products
function searchProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search)
  );

  displayProducts(filtered);
}

// Add To Cart
function addToCart(index) {
  cart.push(products[index]);

  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");

  cartItems.innerHTML = "";

  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += Number(item.price);

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>Rs. ${item.price}</span>
      </div>
    `;
  });

  total.innerText = totalPrice;
}

// Print Receipt
function printReceipt() {
  const shop = JSON.parse(localStorage.getItem("shopData"));

  let receipt = `
    <h2>${shop.name}</h2>
    <p>${shop.location}</p>
    <p>${shop.phone}</p>
    <p>Cashier: ${shop.cashier}</p>
    <hr>
  `;

  let total = 0;

  cart.forEach(item => {
    total += Number(item.price);

    receipt += `
      <p>${item.name} - Rs.${item.price}</p>
    `;
  });

  receipt += `
    <hr>
    <h3>Total: Rs.${total}</h3>
  `;

  const printWindow = window.open('', '', 'width=300,height=600');

  printWindow.document.write(receipt);
  printWindow.document.close();
  printWindow.print();
}

// Initial Load
displayProducts();
