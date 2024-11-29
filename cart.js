let cart = {}

function addToCart(category, id){
  const product = productsList[category][id];
  if(!cart[id]){
    cart[id] = {
      product,
      amount: 0
    }
  }

  cart[id].amount++;

  updateCartList();
}

function removeFromCart(id){
  if(!cart[id]){return;}

  cart[id].amount--;
  if(cart[id].amount <= 0){
    delete cart[id];
  }

  updateCartList();
}

function emptyCart(){
  cart = {};
  updateCartList();
}

const checkoutButton = document.querySelector("#checkout-btn");
checkoutButton.disabled = true;
checkoutButton.onclick = doCheckout;
function checkAllowCheckout(){
  checkoutButton.disabled = true;

  if(Object.keys(cart).length){
    checkoutButton.disabled = false;
    return true;
  }

  return false;
}

function formCheckoutText(){
  const cartList = Object.keys(cart).map(id =>{
    const {name, price} = cart[id].product;
    const {amount} = cart[id];

    return `${amount}x - ${name} - R$${price.toFixed(2)}`;
  })

  return `Olá estava interessado nesses produtos no seu site, poderia me ajudar? \n Lista de produtos:%0a${cartList.join("%0a")}`
}

const vendorList = document.querySelector("#vendedores");
const vendorNumbers = document.querySelectorAll(".vendor-number");
function doCheckout(){
  if(!checkAllowCheckout()){
    return};

  vendorList.style.display = "block"
  vendorNumbers.forEach(vendor =>{
    const whatsappNumber = vendor.getAttribute("data-whatsapp");
    vendor.onclick = ()=>{
      window.open(`https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${formCheckoutText()}`)
      emptyCart(); 
      vendorList.style.display = "none"
    }
  })
  
}

const cartContainerElement = document.querySelector("#cart-items");
function updateCartList(){
  cartContainerElement.innerHTML = "";

  const priceElement = document.createElement("p");
  let totalPrice = 0;
  Object.keys(cart).forEach(id =>{
    const {name, price} = cart[id].product;
    const {amount} = cart[id];

    const element = document.createElement("p");

    element.style.cursor = "pointer";
    element.onclick = ()=>{removeFromCart(id)};
    element.innerHTML = `${amount}x - ${name} - R$${price.toFixed(2)}`

    cartContainerElement.appendChild(element);
    totalPrice += amount * price;
  })

  cartContainerElement.appendChild(document.createElement("br"));

  priceElement.innerHTML = `Total: R$ ${totalPrice.toFixed(2)}`;
  cartContainerElement.appendChild(priceElement);

  checkAllowCheckout();
}
