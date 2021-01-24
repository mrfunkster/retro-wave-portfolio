let header = document.querySelector('.header');
let burgerBtn = document.querySelector('.header-burger');
let overlay = document.querySelector('.overlay');
let navMenu = document.querySelector('.menu');

burgerBtn.addEventListener('click', () => {
    if(header.classList.contains('show-burger')) {
        header.classList.remove('show-burger');
        overlay.classList.remove('show');
        overlay.removeEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    } else {
        overlay.classList.add('show');
        header.classList.add('show-burger');
        overlay.addEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    }
})

const closeBurger = () => {
    header.classList.remove('show-burger');
    overlay.classList.remove('show');
}

