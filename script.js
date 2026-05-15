```javascript
// =====================================
// AiLK POS SYSTEM
// FULL UPDATED SCRIPT
// =====================================

let products =
JSON.parse(localStorage.getItem("products")) || [];

let bill = [];

let cashiers =
JSON.parse(localStorage.getItem("cashiers")) || [];

let todaySales =
Number(localStorage.getItem("todaySales")) || 0;

let totalBills =
Number(localStorage.getItem("totalBills")) || 0;

// =====================================
// PAGE LOAD
// =====================================

window.onload = () => {

    // LOGIN BUTTON
    const loginBtn =
    document.getElementById("loginBtn");

    if(loginBtn){

        loginBtn.addEventListener(
            "click",
            loginSystem
        );

    }

    loadShop();

    displayProducts();

    displayManageProducts();

    displayCashiers();

    updateSummary();

    updateDate();

};

// =====================================
// LOGIN SYSTEM
// =====================================

function loginSystem(){

    const shopName =
    document.getElementById("shopName").value.trim();

    const shopLocation =
    document.getElementById("shopLocation").value.trim();

    const shopPhone =
    document.getElementById("shopPhone").value.trim();

    const cashierName =
    document.getElementById("cashierName").value.trim();

    if(
        !shopName ||
        !shopLocation ||
        !shopPhone ||
        !cashierName
    ){

        alert("Please Fill All Details");

        return;

    }

    const shop = {

        shopName,
        shopLocation,
        shopPhone,
        cashierName

    };

    localStorage.setItem(
        "shop",
        JSON.stringify(shop)
    );

    // ADD CASHIER
    if(!cashiers.includes(cashierName)){

        cashiers.push(cashierName);

        localStorage.setItem(
            "cashiers",
            JSON.stringify(cashiers)
        );

    }

    loadShop();

}

// =====================================
// LOAD SHOP
// =====================================

function loadShop(){

    const shop =
    JSON.parse(localStorage.getItem("shop"));

    if(shop){

        // HIDE LOGIN
        document.getElementById("loginScreen")
        .style.display = "none";

        // SHOP TITLE
        document.getElementById("shopTitle")
        .innerText = shop.shopName;

        // ACCOUNT
        document.getElementById("accountShop")
        .innerText = shop.shopName;

        document.getElementById("accountLocation")
        .innerText = shop.shopLocation;

        document.getElementById("accountPhone")
        .innerText = shop.shopPhone;

        // CASHIER
        loadCashierDropdown(
            shop.cashierName
        );

    }

}

// =====================================
// CASHIER DROPDOWN
// =====================================

function loadCashierDropdown(currentCashier){

    const dropdown =
    document.getElementById("cashierDropdown");

    if(!dropdown) return;

    dropdown.innerHTML = "";

    cashiers.forEach(cashier => {

        dropdown.innerHTML += `

        <option value="${cashier}">
            ${cashier}
        </option>

        `;

    });

    dropdown.value = currentCashier;

}

function changeCashierByDropdown(){

    const shop =
    JSON.parse(localStorage.getItem("shop"));

    shop.cashierName =
    document.getElementById("cashierDropdown").value;

    localStorage.setItem(
        "shop",
        JSON.stringify(shop)
    );

}

// =====================================
// DATE
// =====================================

function updateDate(){

    setInterval(() => {

        const dateBox =
        document.getElementById("dateBox");

        if(dateBox){

            dateBox.innerText =
            new Date().toLocaleString();

        }

    },1000);

}

// =====================================
// PAGE SWITCH
// =====================================

function showPage(pageId){

    document.querySelectorAll(".page")
    .forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });

    document.getElementById(pageId)
    .classList.add("active-page");

}

// =====================================
// POPUP
// =====================================

function openPopup(){

    document.getElementById("popup")
    .style.display = "flex";

}

function closePopup(){

    document.getElementById("popup")
    .style.display = "none";

}

// =====================================
// SAVE PRODUCT
// =====================================

function saveProduct(){

    const name =
    document.getElementById("productName")
    .value.trim();

    const barcode =
    document.getElementById("productBarcode")
    .value.trim();

    const price =
    document.getElementById("productPrice")
    .value.trim();

    const qty =
    document.getElementById("productQty")
    .value.trim();

    if(
        !name ||
        !barcode ||
        !price ||
        !qty
    ){

        alert("Fill Product Details");

        return;

    }

    const product = {

        id: Date.now(),

        name,

        barcode,

        price: Number(price),

        qty: Number(qty)

    };

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();

    displayManageProducts();

    closePopup();

    // CLEAR INPUTS
    document.getElementById("productName").value = "";
    document.getElementById("productBarcode").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQty").value = "";

}

// =====================================
// DISPLAY PRODUCTS
// =====================================

function displayProducts(filtered = products){

    const productList =
    document.getElementById("productList");

    if(!productList) return;

    productList.innerHTML = "";

    filtered.forEach(product => {

        productList.innerHTML += `

        <div class="product-item">

            <div>

                <h3>${product.name}</h3>

                <p>${product.barcode}</p>

                <p>LKR ${product.price}</p>

                <p>Stock : ${product.qty}</p>

            </div>

            <button onclick="addToBill(${product.id})">
                +
            </button>

        </div>

        `;

    });

}

// =====================================
// SEARCH PRODUCTS
// =====================================

function searchProducts(){

    const search =
    document.getElementById("searchInput")
    .value.toLowerCase();

    const filtered =
    products.filter(product =>

        product.name
        .toLowerCase()
        .includes(search)

        ||

        product.barcode
        .toLowerCase()
        .includes(search)

    );

    displayProducts(filtered);

}

// =====================================
// ADD TO BILL
// =====================================

function addToBill(id){

    const product =
    products.find(p => p.id === id);

    if(!product) return;

    if(product.qty <= 0){

        alert("Out Of Stock");

        return;

    }

    product.qty--;

    bill.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();

    displayManageProducts();

    updateBill();

}

// =====================================
// UPDATE BILL
// =====================================

function updateBill(){

    const billItems =
    document.getElementById("billItems");

    if(!billItems) return;

    billItems.innerHTML = "";

    let total = 0;

    bill.forEach((item,index) => {

        total += item.price;

        billItems.innerHTML += `

        <div class="bill-item">

            <div>

                <h3>${item.name}</h3>

                <p>LKR ${item.price}</p>

            </div>

            <button onclick="removeBillItem(${index})">
                X
            </button>

        </div>

        `;

    });

    document.getElementById("billTotal")
    .innerText = "LKR " + total;

}

// =====================================
// REMOVE BILL ITEM
// =====================================

function removeBillItem(index){

    bill.splice(index,1);

    updateBill();

}

// =====================================
// CLEAR BILL
// =====================================

function clearBill(){

    bill = [];

    updateBill();

}

// =====================================
// CHECKOUT
// =====================================

function checkoutBill(){

    let total = 0;

    bill.forEach(item => {

        total += item.price;

    });

    todaySales += total;

    totalBills++;

    localStorage.setItem(
        "todaySales",
        todaySales
    );

    localStorage.setItem(
        "totalBills",
        totalBills
    );

    updateSummary();

    alert("Checkout Success");

    clearBill();

}

// =====================================
// PRINT RECEIPT
// =====================================

function printReceipt(){

    const shop =
    JSON.parse(localStorage.getItem("shop"));

    let total = 0;

    let receipt = `

    <center>

    <h2>${shop.shopName}</h2>

    <p>${shop.shopLocation}</p>

    <p>${shop.shopPhone}</p>

    <hr>

    <h3>Cashier :
    ${shop.cashierName}</h3>

    `;

    bill.forEach(item => {

        total += item.price;

        receipt += `

        <p>
            ${item.name}
            -
            LKR ${item.price}
        </p>

        `;

    });

    receipt += `

    <hr>

    <h2>Total : LKR ${total}</h2>

    <p>Thank You Come Again</p>

    </center>

    `;

    const printWindow =
    window.open(
        "",
        "",
        "width=350,height=600"
    );

    printWindow.document.write(receipt);

    printWindow.print();

}

// =====================================
// MANAGE PRODUCTS
// =====================================

function displayManageProducts(){

    const manage =
    document.getElementById("manageProducts");

    if(!manage) return;

    manage.innerHTML = "";

    products.forEach(product => {

        manage.innerHTML += `

        <div class="manage-product-item">

            <div>

                <h3>${product.name}</h3>

                <p>${product.barcode}</p>

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

// =====================================
// EDIT PRODUCT
// =====================================

function editProduct(id){

    const product =
    products.find(p => p.id === id);

    if(!product) return;

    const newName =
    prompt(
        "Edit Product Name",
        product.name
    );

    const newPrice =
    prompt(
        "Edit Product Price",
        product.price
    );

    if(newName && newPrice){

        product.name = newName;

        product.price = Number(newPrice);

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        displayProducts();

        displayManageProducts();

    }

}

// =====================================
// DELETE PRODUCT
// =====================================

function deleteProduct(id){

    products =
    products.filter(p => p.id !== id);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();

    displayManageProducts();

}

// =====================================
// CASHIERS
// =====================================

function addCashier(){

    const cashier =
    document.getElementById("newCashier")
    .value.trim();

    if(!cashier) return;

    cashiers.push(cashier);

    localStorage.setItem(
        "cashiers",
        JSON.stringify(cashiers)
    );

    displayCashiers();

    loadCashierDropdown(cashier);

    document.getElementById("newCashier")
    .value = "";

}

function displayCashiers(){

    const list =
    document.getElementById("cashierList");

    if(!list) return;

    list.innerHTML = "";

    cashiers.forEach((cashier,index) => {

        list.innerHTML += `

        <div class="manage-product-item">

            <h3>${cashier}</h3>

            <button onclick="deleteCashier(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

function deleteCashier(index){

    cashiers.splice(index,1);

    localStorage.setItem(
        "cashiers",
        JSON.stringify(cashiers)
    );

    displayCashiers();

}

// =====================================
// SUMMARY
// =====================================

function updateSummary(){

    document.getElementById("todaySales")
    .innerText = "LKR " + todaySales;

    document.getElementById("totalBills")
    .innerText = totalBills;

}

// =====================================
// DELETE ACCOUNT
// =====================================

function deleteAccount(){

    const confirmDelete =
    confirm("Delete Account?");

    if(confirmDelete){

        localStorage.clear();

        location.reload();

    }

}
```
