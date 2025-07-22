async function fetchDatas() {
    try {
        const response = await fetch(`/api/products`);
        if (!response.ok) throw new Error("Fetch failed", response.status);

        const data = await response.json();
        console.log(data);
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

async function main() {
  await fetchDatas();  
  addNavButtons();

}
main();
//window.addEventListener('load', main);