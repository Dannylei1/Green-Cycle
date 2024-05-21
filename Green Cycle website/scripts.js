document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.product-item button');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product-item');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace('Price: $', ''));
            const productImage = product.querySelector('img').src;

            if (event.target.textContent === 'Add to Cart') {
                addToCart(productName, productPrice, productImage);
                alert('Added to Cart');
            }
        });
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(name, price, image) {
        cart.push({ name, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartPage();
    }

    function removeFromCart(name) {
        const productIndex = cart.findIndex(item => item.name === name);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartPage();
    }

    function updateCartPage() {
        const cartContainer = document.getElementById('cart-items');
        const totalAmountElement = document.getElementById('total-amount');
        let totalAmount = 0;

        if (cartContainer) {
            cartContainer.innerHTML = '';
            cart.forEach(product => {
                totalAmount += product.price;
                const productElement = document.createElement('div');
                productElement.classList.add('cart-item');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button class="remove-from-cart">Remove</button>
                `;
                cartContainer.appendChild(productElement);
            });

            totalAmountElement.textContent = totalAmount.toFixed(2);

            const removeButtons = cartContainer.querySelectorAll('.remove-from-cart');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productName = event.target.closest('.cart-item').querySelector('h3').textContent;
                    removeFromCart(productName);
                });
            });
        }
    }

    updateCartPage();
});
