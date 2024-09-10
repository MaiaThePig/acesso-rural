document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const productItems = document.querySelectorAll('.product-item');
    const cartButton = document.querySelector('a[href="#carrinho"]');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    let cartCount = 0;
    let cart = [];

    // Mecanismo de busca
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        productItems.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            if (name.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest('.product-item');
            const productName = productItem.dataset.name;
            const productPrice = parseFloat(productItem.dataset.price);
            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    // Mostrar detalhes do produto
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest('.product-item');
            const productName = productItem.dataset.name;
            const productDescription = productItem.dataset.description;
            const productPrice = productItem.dataset.price;
            showProductDetails(productName, productDescription, productPrice);
        });
    });

    // Fechar modal de detalhes
    const modal = document.getElementById('product-modal');
    const closeModalButton = document.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    function showProductDetails(name, description, price) {
        modal.style.display = 'block';
        document.getElementById('modal-title').textContent = name;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('modal-price').textContent = `Preço: R$ ${price}`;
    }

    // Atualizar carrinho
    function updateCart() {
        cartCount = cart.length;
        cartButton.textContent = `Carrinho (${cartCount})`;
        if (cartCount === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            checkoutButton.disabled = true;
        } else {
            let cartHTML = '';
            let totalPrice = 0;
            cart.forEach(item => {
                cartHTML += `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
                totalPrice += item.price;
            });
            cartHTML += `<p>Total: R$ ${totalPrice.toFixed(2)}</p>`;
            cartItemsContainer.innerHTML = cartHTML;
            checkoutButton.disabled = false;
        }
    }

    // Finalizar compra
    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada com sucesso!');
        cart = [];
        updateCart();
    });
});
