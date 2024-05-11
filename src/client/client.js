const URL = "http://localhost:8080"; // Server URL

document.getElementById("userDataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const userData = {
        name: formData.get("name"),
        email: formData.get("email")
    };
    saveUserData(userData);
});

document.getElementById("productDataForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const productData = {
        productName: formData.get("productName"),
        price: parseFloat(formData.get("price"))
    };
    saveProductData(productData);
});

function saveUserData(userData) {
    fetch(`${URL}/api/user/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("User data saved successfully:", data);
        displayUserData(data);
    })
    .catch(error => console.error('Error saving user data:', error));
}

function saveProductData(productData) {
    fetch(`${URL}/api/product/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Product data saved successfully:", data);
        displayProductData(data);
    })
    .catch(error => console.error('Error saving product data:', error));
}

function displayUserData(userData) {
    const userDataDisplay = document.getElementById("userDataDisplay");
    userDataDisplay.innerHTML = `
        <h2>User Data</h2>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
    `;
}

function displayProductData(productData) {
    const productDataDisplay = document.getElementById("productDataDisplay");
    productDataDisplay.innerHTML = `
        <h2>Product Data</h2>
        <p><strong>Product Name:</strong> ${productData.productName}</p>
        <p><strong>Price:</strong> $${productData.price.toFixed(2)}</p>
    `;
}
