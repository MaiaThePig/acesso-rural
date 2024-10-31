function startSearchBar(){
    const searchInput = document.getElementById('search');
    const productItems = document.querySelectorAll('.product-item');

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

}
