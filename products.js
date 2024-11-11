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
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
function showDesc(category, id){
  const {name, description, price} = productsList[category][id];

    modal.style.display = 'block';
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-price').textContent = `Preço: R$${price}`;
}

function renderProducts(categoryList, categoryName){    
    let html = 
    `<div class="category">
    <h3>${categoryName}</h3>`
    
    categoryList.forEach(productId => {
        const product = productsList[categoryName][productId];
        const toAdd = `
        <div class="product-item" data-name="${product.name}" data-category="${categoryName}" data-description="${product.description}" data-price="${product.price}">
                  <img src="${product.imgSrc}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>Preço: R$ ${product.price}</p>
                <button class="details-button" onClick="showDesc('${categoryName}', '${productId}')">Detalhes</button>
                <button class="add-to-cart" onClick="addToCart('${categoryName}', '${productId}')">Adicionar ao Carrinho</button>
            </div>`
        
        html += toAdd
        
    });
    
    html += "</div>"

    return html
};

addEventListener("load", async() => {
    const productGrid = document.querySelector(".product-grid")
    await loadProducts()
    Object.keys(productsList).forEach(categoryName => {
        const products = Object.keys(productsList[categoryName])
        productGrid.innerHTML += renderProducts(products, categoryName)
    })

    startSearchBar();
});
