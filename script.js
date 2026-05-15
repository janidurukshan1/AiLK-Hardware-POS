// =====================================
// AiLK Hardware POS
// FULLY FIXED LOGIN VERSION
// =====================================

// STORAGE
let products =
JSON.parse(localStorage.getItem("products")) || [];

let bill =
JSON.parse(localStorage.getItem("bill")) || [];

let cashiers =
JSON.parse(localStorage.getItem("cashiers")) || [];

// =====================================
// PAGE LOAD
// =====================================

window.onload = function(){

    // LOGIN BUTTON
    const loginBtn =
    document.getElementById("loginBtn");

    if(loginBtn){

        loginBtn.addEventListener(
            "click",
            loginSystem
        );

    }

    // CHECK LOGIN
    checkLogin();

};

// =====================================
// CHECK LOGIN
// =====================================

function checkLogin(){

    const shopData =
    localStorage.getItem("shopData");

    if(shopData){

        document.getElementById("loginScreen")
        .style.display = "none";

    }else{

        document.getElementById("loginScreen")
        .style.display = "flex";

    }

}

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

    // VALIDATION
    if(
        shopName === "" ||
        shopLocation === "" ||
        shopPhone === "" ||
        cashierName === ""
    ){

        alert("Please Fill All Details");

        return;

    }

    // SAVE DATA
    const shopData = {

        shopName: shopName,

        shopLocation: shopLocation,

        shopPhone: shopPhone,

        cashierName: cashierName

    };

    localStorage.setItem(
        "shopData",
        JSON.stringify(shopData)
    );

    // HIDE LOGIN
    document.getElementById("loginScreen")
    .style.display = "none";

    // UPDATE TITLE
    const title =
    document.getElementById("shopTitle");

    if(title){

        title.innerText = shopName;

    }

    alert("Login Success");

}

// =====================================
// PAGE SWITCHING
// =====================================

function showPage(pageId){

    const pages =
    document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active-page");

    });

    const selectedPage =
    document.getElementById(pageId);

    if(selectedPage){

        selectedPage.classList.add("active-page");

    }

}

// =====================================
// PRODUCT POPUP
// =====================================

function openProductPopup(){

    const popup =
    document.getElementById("productPopup");

    if(popup){

        popup.style.display = "flex";

    }

}

function closePopup(){

    const popup =
    document.getElementById("productPopup");

    if(popup){

        popup.style.display = "none";

    }

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
        name === "" ||
        barcode === "" ||
        price === "" ||
        qty === ""
    ){

        alert("Fill Product Details");

        return;

    }

    const product = {

        id: Date.now(),

        name: name,

        barcode: barcode,

        price: Number(price),

        qty: Number(qty)

    };

    products.push(product);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    alert("Product Added");

    closePopup();

    displayProducts();

}

// =====================================
// DISPLAY PRODUCTS
// =====================================

function displayProducts(){

    const productList =
    document.getElementById("productList");

    if(!productList){

        return;

    }

    productList.innerHTML = "";

    products.forEach(product => {

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
// ADD TO BILL
// =====================================

function addToBill(id){

    const product =
    products.find(p => p.id === id);

    if(!product){

        return;

    }

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

    updateBill();

    displayProducts();

}

// =====================================
// UPDATE BILL
// =====================================

function updateBill(){

    const billItems =
    document.getElementById("billItems");

    if(!billItems){

        return;

    }

    billItems.innerHTML = "";

    let total = 0;

    bill.forEach((item,index) => {

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

    const totalBox =
    document.getElementById("billTotal");

    if(totalBox){

        totalBox.innerText =
        "LKR " + total;

    }

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

    if(bill.length === 0){

        alert("Bill Empty");

        return;

    }

    alert("Checkout Success");

    clearBill();

}

// =====================================
// PRINT RECEIPT
// =====================================

function printReceipt(){

    window.print();

}
