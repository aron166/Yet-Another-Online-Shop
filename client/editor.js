async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fetch failed ${response.status}`);

        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.error('Could not fetch:', error.message);
    }    
}

function addNavButtons () {
    const navBarDiv = document.getElementById('header');
    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.id = 'homeButton';
    homeButton.addEventListener('click', () => {
        window.location.href = '/static/index.html';
    });
    navBarDiv.appendChild(homeButton);
    const cartBtn = document.createElement('button');
    cartBtn.textContent = 'Cart';
    cartBtn.id = 'cart';
    navBarDiv.appendChild(cartBtn);
    const adminPublicBtn = document.createElement('button');
    adminPublicBtn.textContent = 'Admin Mode';
    adminPublicBtn.id = 'admin-public';
    adminPublicBtn.addEventListener('click', () => {
        window.location.href = '/static/editor.html';
    });
    navBarDiv.appendChild(adminPublicBtn);
}

function setupForm() {
    const form = document.getElementById('add-form');

    if (!form) {
        console.warn('Form not found!');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const payload = {
            title: formData.get('title'),
            dimensions: formData.get('dimensions'),
            technique: formData.get('technique'),
            price: formData.get('price'),
            img: formData.get('img')
        };

        try {
            const response = await fetch('/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const result = await response.json();
            console.log('Success:', result);
            alert('Successful saving!');
            form.reset();

        } catch (error) {
            console.error('Could not save:', error.message);
            alert('Unsuccessed saving.');
        }
    });
}

async function main() {
    await fetchData('/api/products');
    addNavButtons();
    setupForm();
}
window.addEventListener('load', main);