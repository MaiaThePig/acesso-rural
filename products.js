const productsList = {}

async function loadProducts() {
    const req = await fetch("http://localhost:8000/");
    const res = await req.json();
    console.log(res);

    const data = res.data

    data.forEach(product => {
       const category = product.category
       if(!productsList[category]){
        productsList[category] = {}
       }
       productsList[category][product._id] = product
    });
};

const modal = document.querySelector("#product-modal");
/*const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});*/
function showDesc(category, id){
  const {name, description, price} = productsList[category][id];

    modal.style.display = 'block';
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-price').textContent = price;
}

function renderProducts(categoryList, categoryName){    
    let html = `
    <div class="products-container">
    `
    
    categoryList.forEach(productId => {
        const product = productsList[categoryName][productId];
        const toAdd = `
        <div class="products-container">
            <div class="box">
                <img src="${product.imgSrc}" alt="${product.name}">
                <h2>${product.name}</h2>
                <h3 class="price">R$${product.price} <span>/unidade</span></h3>
                <i class='bx bx-cart-alt'></i>
                <i class='bx bx-heart'></i>
            </div>
        </div>`
        
        html += toAdd
        
    });
    
    html += "</div>"

    return html
};

addEventListener("load", async() => {
    const productGrid = document.querySelector(".products")
    await loadProducts()
    Object.keys(productsList).forEach(categoryName => {
        const products = Object.keys(productsList[categoryName])
        productGrid.innerHTML += renderProducts(products, categoryName)
    })

    startSearchBar();
});
