let burgerBtn            = document.querySelector('.header-burger');
let overlay              = document.querySelector('.overlay');
let navMenu              = document.querySelector('.menu');
let wrapper              = document.querySelector('.wrapper');
let mobileHeader         = document.querySelector('.mobile-header');
let welcomeSection       = document.querySelector('.welcome-section')
let mobileHeaderHeight   = mobileHeader.offsetHeight;
let welcomeSectionHeight = welcomeSection.offsetHeight;
let viewportWidth        = window.innerWidth;
let playBtn              = document.querySelector('.player-btn');

const closeBurger = () => {
    burgerBtn.classList.remove('show-burger');
    overlay.classList.remove('show');
    wrapper.classList.remove('show-menu');
    setTimeout(()=>{
        document.body.classList.remove('lock');
    }, 350)    
}

const headerVisibility = () => {
    if ((window.pageYOffset >= (welcomeSectionHeight - mobileHeaderHeight)) && viewportWidth <= 1024) {
        mobileHeader.classList.add('visible')
    } else {
        mobileHeader.classList.remove('visible')
    }
}

window.addEventListener('resize', () => {
    viewportWidth = window.innerWidth;
    headerVisibility();
});
window.addEventListener("scroll", headerVisibility);

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
    };
});

// Scroll

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        anchors.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const blockID = anchor.getAttribute('href').substr(1);
        let block = document.getElementById(blockID);
        let headerOffset;
        if (window.innerWidth <= 1024) {
            headerOffset = mobileHeaderHeight;
        } else {
            headerOffset = 0;
        };
        closeBurger();
        setTimeout(() => {
            $('html, body').animate({
                scrollTop: $(block).offset().top - headerOffset
            }, 800);
        }, 200)
    })
}