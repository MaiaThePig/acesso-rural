// Simulando o carrinho
let carrinho = [];

// Função para atualizar o carrinho no HTML
function atualizarCarrinho() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  if (carrinho.length === 0) {
    cartItemsDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
    document.getElementById("checkout-btn").disabled = true;
    return;
  }

  carrinho.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <p>${item.nome} - R$ ${item.preco} x ${item.quantidade}</p>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  document.getElementById("checkout-btn").disabled = false;
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
  // Verifica se o produto já está no carrinho
  const produtoExistente = carrinho.find(item => item.nome === nome);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome: nome,
      preco: preco,
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

// Adiciona eventos aos botões de adicionar ao carrinho
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {
    const produtoDiv = this.closest(".product-item");
    const nome = produtoDiv.getAttribute("data-name");
    const preco = produtoDiv.getAttribute("data-price");

    adicionarAoCarrinho(nome, preco);
  });
});

// Função para gerar a lista de produtos como string
function gerarListaDeProdutos() {
  let lista = "Lista de produtos:\n\n";
  carrinho.forEach((produto, index) => {
    lista += `${index + 1}. ${produto.nome} - ${produto.quantidade}x - R$ ${produto.preco}\n`;
  });
  return encodeURIComponent(lista);
}

// Evento de clique no botão de checkout
document.getElementById("checkout-btn").addEventListener("click", function () {
  // Exibe a lista de vendedores
  document.getElementById("vendedores").style.display = "block";
});

// Evento de clique nos vendedores
document.querySelectorAll(".vendedor").forEach(vendedor => {
  vendedor.addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir comportamento padrão do link

    // Recupera o número de WhatsApp do vendedor
    const numeroWhatsapp = this.getAttribute("data-whatsapp");
    const listaDeProdutos = gerarListaDeProdutos();

    // Monta a URL do WhatsApp com a mensagem formatada
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${listaDeProdutos}`;

    // Redireciona para o WhatsApp
    window.open(urlWhatsapp, "_blank");
  });
});
