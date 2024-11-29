let productsList = {};

async function loadProducts() {
    productsList = {};  // Limpa os produtos
    const req = await fetch("http://localhost:8000/");
    const res = await req.json();
    console.log(res);

    const data = res.data;

    data.forEach(product => {
        const category = product.category;
        if (!productsList[category]) {
            productsList[category] = {};
        }
        productsList[category][product._id] = product;
    });
}

async function deleteProduct(id) {
    const url = `http://localhost:8000/${id}`;

    fetch(url, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(async (data) => {
        console.log('Resultado:', data);
        await loadProducts();
        updateProduct();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

const modal = document.querySelector("#product-modal");

function showDesc(category, id) {
    const { name, description, price } = productsList[category][id];

    modal.style.display = 'block';
    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-price').textContent = price;
}

// Função de renderização dos produtos filtrados
function renderProducts(categoryList, categoryName) {
    let html = `<div class="products-container">`;

    const isAdmin = document.querySelector('#products').getAttribute('admin') === "1";

    categoryList.forEach(productId => {
        const product = productsList[categoryName][productId];
        
        let deleteButton = '';
        if (isAdmin) {
            deleteButton = `<i class='bx bx-trash-alt' onclick="deleteProduct('${productId}');"></i>`;
        } else {
            deleteButton = `<i class='bx bx-trash-alt' onclick="removeFromCart('${productId}');"></i>`;
        }

        const toAdd = `
        <div class="box">
            <img src="http://localhost:8000/uploads/${product.imgSrc}" alt="${product.name}">
            <h2>${product.name}</h2>
            <h3 class="price">R$${product.price} <span>/unidade</span></h3>
            <i class='bx bx-cart-alt'></i>
            ${deleteButton}
        </div>`;
        
        html += toAdd;
    });

    html += "</div>";
    return html;
}

// Função para filtrar produtos por categoria
function filterProducts(category) {
    const productGrid = document.querySelector(".products .products-container");
    
    // Limpa os produtos exibidos
    productGrid.innerHTML = "";

    // Verifica se há produtos para a categoria, se não, exibe uma mensagem
    if (productsList[category]) {
        const products = Object.keys(productsList[category]);
        productGrid.innerHTML = renderProducts(products, category);
    } else {
        productGrid.innerHTML = "<p>Não há produtos para esta categoria.</p>";
    }
}

// Função para remover o filtro e mostrar todos os produtos
function removeFilter() {
    const productGrid = document.querySelector(".products .products-container");
    
    // Limpa o conteúdo da área de produtos
    productGrid.innerHTML = "";

    // Renderiza todos os produtos
    updateProduct();  // Chama a função que renderiza todos os produtos
}


// Função para carregar os produtos iniciais ou de todas as categorias
async function updateProduct() {
    const productGrid = document.querySelector(".products .products-container");
    productGrid.innerHTML = "";

    await loadProducts();
    
    // Exibe todos os produtos inicialmente
    Object.keys(productsList).forEach(categoryName => {
        const products = Object.keys(productsList[categoryName]);
        productGrid.innerHTML += renderProducts(products, categoryName);
    });
}

addEventListener("load", async () => {
    await updateProduct();
});
