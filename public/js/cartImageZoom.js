const carts = document.querySelectorAll('.cart-item');


carts.forEach(cart => {
    const img = cart.querySelector('img');
    cart.addEventListener('mouseover', function () {
        img.classList.add('zoomedIn')
    });
    cart.addEventListener('mouseout', function () {
        img.classList.remove('zoomedIn')
    });
});

