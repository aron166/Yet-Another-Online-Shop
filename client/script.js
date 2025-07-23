async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fetch failed", response.status);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch:", error.message);
    }
    
}


function addNavButtons () {
    const navBarDiv = document.getElementById('header');
    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.id = 'homeButton';
    navBarDiv.appendChild(homeButton);
    const cartBtn = document.createElement('button');
    cartBtn.textContent = 'Cart';
    cartBtn.id = 'cart';
    navBarDiv.appendChild(cartBtn);
    const adminPublicBtn = document.createElement('button');
    adminPublicBtn.textContent = 'Admin Mode';
    adminPublicBtn.id = 'admin-public';
    navBarDiv.appendChild(adminPublicBtn);
}
 function showcart() {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById('cart').style.display = "block";
}
function showHomePage(){
    const section = document.querySelectorAll("section");
    section.forEach(sec => sec.style.display = 'none');
    document.getElementById('slideshow').style.display = 'block';
    document.getElementById('product-list').style.display = 'block';
}

function createSlideShowCard(product){
    return `
    <div id="slide-container" style="background-image: url(${product.img});>
                    <div class="img-holder">
                        <div class="info-holder">
                            <div class="info-item-title">
                                <h3>Title</h3>
                                <p id="info-title">${product.title}</p>
                            </div>
                            <div class="info-item-dimension">
                                <h3>Dimension</h3>
                                <p id="indo-dimension">${product.dimensions}</p>
                            </div>
                            <div class="info-item-technique">
                                <h3>Technique</h3>
                                <p id="info-technique">${product.technique}</p>
                            </div>
                            <div class="info-item-price">
                                <h3>Price</h3>
                                <p id="info-item">${product.price}</p>
                            </div>
                        </div>
                    </div>
    `
}

async function fetchProductHTML(productID) {
    const product = await fetchData(`/api/product/${productID}`);
    const resultHtml = createSlideShowCard(product);
    return resultHtml;
}
function createProductCard(product){
    const root = document.getElementById('product-container');
    const item = `
    <div class="product-item" value="${product.id}">
        <div class="product-image" style="background-image: url(${product.img})"></div>
        <button class="addCartBtn" data-product-id="${product.id}">Add to cart</button>
    </div>`
    root.insertAdjacentHTML("afterbegin", item);
}

async function productListFetching() {
    let products = await fetchData('/api/products');
    products = JSON.parse(products)
    for (const product of products){
        createProductCard(product);
    }
}
async function addToCart(productId) {
    let allProducts = await fetchData('/api/products');
    let products = await JSON.parse(allProducts);
    const product = products.find((p)=>{
        return p.id === productId;
    })
    fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
        id: product.id,
        title: product.title,
        quantity: 1

  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});
    
    
}
async function addingBtnFunctionality() {
    const root = document.getElementById('product-container')
    const addToCartBtns = root.querySelectorAll('button');
    for (const btn of addToCartBtns){
        btn.addEventListener('click', async () => {
            await addToCart(btn.dataset.productId);
        } )
    }
}
async function fetchCart() {
    const cart = await fetchData('/api/checkout');
    console.log(cart);
    
}
function navBarFunctionality(){
    const cartBtn = document.getElementById('cart')
    cartBtn.addEventListener('click', showcart);
    const homeBtn = document.getElementById('homeButton')
    homeBtn.addEventListener('click', showHomePage);
}


async function main() {
  await fetchData('/api/products');
  addNavButtons();
   navBarFunctionality();
  const productDiv = document.getElementById('slideshow');
  productDiv.innerHTML = await fetchProductHTML('1'); 
  await productListFetching();
  addingBtnFunctionality()
  fetchCart()
  showHomePage();


}
main();
//window.addEventListener('load', main);