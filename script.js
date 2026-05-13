// ==========================
// AiLK Hardware Shop POS
// ==========================

// STORAGE
let products = JSON.parse(localStorage.getItem("products")) || [];
let bill = [];
let cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];
let totalBills = Number(localStorage.getItem("totalBills")) || 0;
let todaySales = Number(localStorage.getItem("todaySales")) || 0;

// ==========================
// LOGIN SYSTEM
// ==========================

function loginSystem() {

    const shopName = document.getElementById("shopName").value;
    const shopLocation = document.getElementById("shopLocation").value;
    const shopPhone = document.getElementById("shopPhone").value;
    const cashierName = document.getElementById("cashierName").value;

    if(
        shopName === "" ||
        shopLocation === "" ||
        shopPhone === "" ||
        cashierName === ""
    ){
        alert("Please Fill All Details");
        return;
    }

    const shopData = {
        shopName,
        shopLocation,
        shopPhone,
        cashierName
    };

    localStorage.setItem("shopData", JSON.stringify(shopData));

    document.getElementById("loginScreen").style.display = "none";

    loadShopData();

}

// ==========================
// LOAD SHOP DATA
// ==========================

function loadShopData(){

    const shop = JSON.parse(localStorage.getItem("shopData"));

    if(shop){

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("shopTitle").innerText =
        shop.shopName;

        document.getElementById("cashierDisplay").innerText =
        shop.cashierName;

        document.getElementById("accountShopName").innerText =
        shop.shopName;

        document.getElementById("accountLocation").innerText =
        shop.shopLocation;

        document.getElementById("accountPhone").innerText =
        shop.shopPhone;

        document.getElementById("accountCashier").innerText =
        shop.cashierName;

    }

}

loadShopData();

// ==========================
// DATE & TIME
// ==========================

function updateDate(){

    const now = new Date();

    document.getElementById("dateBox").innerText =
    now.toLocaleString();

}

setInterval(updateDate,1000);

// ==========================
// PAGE SWITCHING
// ==========================

function showPage(pageId){

    const pages =
    document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    document
    .getElementById(pageId)
    .classList.add("active-page");

}

// ==========================
// PRODUCT POPUP
// ==========================

function openProductPopup(){

    document.getElementById("productPopup")
    .style.display = "flex";

}

function closePopup(){

    document.getElementById("productPopup")
    .style.display = "none";

}

// ==========================
// SAVE PRODUCT
// ==========================

function saveProduct(){

    const name =
    document.getElementById("productName").value;

    const price =
    document.getElementById("productPrice").value;

    if(name === "" || price === ""){
        alert("Enter Product Details");
        return;
    }

    const product = {
        id: Date.now(),
        name,
        price
    };

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();
    displayManageProducts();

    closePopup();

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";

}

// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(filteredProducts = products){

    const productList =
    document.getElementById("productList");

    productList.innerHTML = "";

    filteredProducts.forEach(product => {

        productList.innerHTML += `

        <div class="product-item">

            <div>
                <h3>${product.name}</h3>
                <p>LKR ${product.price}</p>
            </div>

            <button onclick="addToBill(${product.id})">
                +
            </button>

        </div>

        `;

    });

    document.getElementById("totalProducts")
    .innerText = products.length;

}

displayProducts();

// ==========================
// SEARCH PRODUCTS
// ==========================

function searchProducts(){

    const search =
    document.getElementById("searchInput")
    .value.toLowerCase();

    const filtered =
    products.filter(product =>
        product.name
        .toLowerCase()
        .includes(search)
    );

    displayProducts(filtered);

}

// ==========================
// ADD TO BILL
// ==========================

function addToBill(id){

    const product =
    products.find(p => p.id === id);

    bill.push(product);

    updateBill();

}

// ==========================
// UPDATE BILL
// ==========================

function updateBill(){

    const billItems =
    document.getElementById("billItems");

    billItems.innerHTML = "";

    let total = 0;

    bill.forEach((item,index)=>{

        total += Number(item.price);

        billItems.innerHTML += `

        <div class="bill-item">

            <div>
                <h4>${item.name}</h4>
                <p>LKR ${item.price}</p>
            </div>

            <button onclick="removeBillItem(${index})">
                ❌
            </button>

        </div>

        `;

    });

    document.getElementById("billTotal")
    .innerText = "LKR " + total;

}

// ==========================
// REMOVE BILL ITEM
// ==========================

function removeBillItem(index){

    bill.splice(index,1);

    updateBill();

}

// ==========================
// CLEAR BILL
// ==========================

function clearBill(){

    bill = [];

    updateBill();

}

// ==========================
// CHECKOUT
// ==========================

function checkoutBill(){

    let total = 0;

    bill.forEach(item => {
        total += Number(item.price);
    });

    totalBills++;
    todaySales += total;

    localStorage.setItem(
        "totalBills",
        totalBills
    );

    localStorage.setItem(
        "todaySales",
        todaySales
    );

    document.getElementById("todaySales")
    .innerText = "LKR " + todaySales;

    document.getElementById("totalBills")
    .innerText = totalBills;

    document.getElementById("dailyIncome")
    .innerText = "LKR " + todaySales;

    document.getElementById("weeklyIncome")
    .innerText = "LKR " + (todaySales * 7);

    document.getElementById("yearIncome")
    .innerText = "LKR " + (todaySales * 365);

    alert("Bill Checkout Success");

    printReceipt();

    clearBill();

}

// ==========================
// PRINT RECEIPT
// ==========================

function printReceipt(){

    const shop =
    JSON.parse(localStorage.getItem("shopData"));

    let total = 0;

    let receipt = `

    <center>

    <h2>${shop.shopName}</h2>

    <p>${shop.shopLocation}</p>

    <p>${shop.shopPhone}</p>

    <p>Cashier : ${shop.cashierName}</p>

    <hr>

    `;

    bill.forEach(item=>{

        total += Number(item.price);

        receipt += `

        <p>
        ${item.name}
        - LKR ${item.price}
        </p>

        `;

    });

    receipt += `

    <hr>

    <h3>Total : LKR ${total}</h3>

    <p>Thank You Come Again</p>

    </center>

    `;

    const printWindow =
    window.open(
        '',
        '',
        'width=300,height=600'
    );

    printWindow.document.write(receipt);

    printWindow.document.close();

    printWindow.print();

}

// ==========================
// MANAGE PRODUCTS
// ==========================

function displayManageProducts(){

    const manageProducts =
    document.getElementById("manageProducts");

    manageProducts.innerHTML = "";

    products.forEach(product=>{

        manageProducts.innerHTML += `

        <div class="manage-product-item">

            <div>
                <h3>${product.name}</h3>
                <p>LKR ${product.price}</p>
            </div>

            <div>

                <button onclick="editProduct(${product.id})">
                    Edit
                </button>

                <button onclick="deleteProduct(${product.id})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

displayManageProducts();

// ==========================
// DELETE PRODUCT
// ==========================

function deleteProduct(id){

    products =
    products.filter(product =>
        product.id !== id
    );

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();
    displayManageProducts();

}

// ==========================
// EDIT PRODUCT
// ==========================

function editProduct(id){

    const product =
    products.find(p => p.id === id);

    const newName =
    prompt("Edit Product Name",product.name);

    const newPrice =
    prompt("Edit Product Price",product.price);

    if(newName && newPrice){

        product.name = newName;
        product.price = newPrice;

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        displayProducts();
        displayManageProducts();

    }

}

// ==========================
// CASHIERS
// ==========================

function addCashier(){

    const cashier =
    document.getElementById("newCashier")
    .value;

    if(cashier === ""){
        return;
    }

    cashiers.push(cashier);

    localStorage.setItem(
        "cashiers",
        JSON.stringify(cashiers)
    );

    displayCashiers();

    document.getElementById("newCashier")
    .value = "";

}

function displayCashiers(){

    const cashierList =
    document.getElementById("cashierList");

    cashierList.innerHTML = "";

    cashiers.forEach((cashier,index)=>{

        cashierList.innerHTML += `

        <div class="manage-product-item">

            <h3>${cashier}</h3>

            <button onclick="deleteCashier(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

displayCashiers();

// ==========================
// DELETE CASHIER
// ==========================

function deleteCashier(index){

    cashiers.splice(index,1);

    localStorage.setItem(
        "cashiers",
        JSON.stringify(cashiers)
    );

    displayCashiers();

}

// ==========================
// ACCOUNT SETTINGS
// ==========================

function resetAccount(){

    const confirmDelete =
    confirm("Delete Login Details?");

    if(confirmDelete){

        localStorage.clear();

        location.reload();

    }

}

function addAnotherAccount(){

    location.reload();

}

// ==========================
// LOAD SUMMARY
// ==========================

document.getElementById("todaySales")
.innerText = "LKR " + todaySales;

document.getElementById("totalBills")
.innerText = totalBills;

document.getElementById("dailyIncome")
.innerText = "LKR " + todaySales;

document.getElementById("weeklyIncome")
.innerText = "LKR " + (todaySales * 7);

document.getElementById("yearIncome")
.innerText = "LKR " + (todaySales * 365);
