let burgerBtn = document.querySelector('.header-burger');
let overlay = document.querySelector('.overlay');
let navMenu = document.querySelector('.menu');
let wrapper = document.querySelector('.wrapper');

burgerBtn.addEventListener('click', () => {
    if(burgerBtn.classList.contains('show-burger')) {
        closeBurger();
        overlay.removeEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    } else {
        overlay.classList.add('show');
        wrapper.classList.add('show-menu');
        burgerBtn.classList.add('show-burger');
        document.body.classList.add('lock')
        overlay.addEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    }
})

const closeBurger = () => {
    burgerBtn.classList.remove('show-burger');
    overlay.classList.remove('show');
    wrapper.classList.remove('show-menu');
    setTimeout(()=>{
        document.body.classList.remove('lock');
    }, 350)    
}

