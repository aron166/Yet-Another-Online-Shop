async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fetch failed", response.status);

        const data = await response.json();
        console.log(data);
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
                                <p id="indo-dimension">${product.dimension}</p>
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
    const root = document.querySelector('.product-container');
    const img = document.createElement('img');
    img.src = product.img;
    img.classList.add('product-item')
    const button = document.createElement('button');
    button.classList.add('addCartBtn');
    root.appendChild(img);
    root.appendChild(button);
}

async function productListFetching() {
    const products = await fetchData('/api/products');
    for (const product of products){
        createProductCard(product);
    }
}

async function main() {
  await fetchData('/api/products');
  addNavButtons();
  const productDiv = document.getElementById('slideshow');
  productDiv.innerHTML = await fetchProductHTML('1'); 
  showHomePage();

}
main();
//window.addEventListener('load', main);