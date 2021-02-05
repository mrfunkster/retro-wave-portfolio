let burgerBtn            = document.querySelector('.header-burger');
let overlay              = document.querySelector('.overlay');
let navMenu              = document.querySelector('.menu');
let wrapper              = document.querySelector('.wrapper');
let mobileHeader         = document.querySelector('.mobile-header');
let welcomeSection       = document.querySelector('.welcome-section');
let mobileHeaderHeight   = mobileHeader.offsetHeight;
let welcomeSectionHeight = welcomeSection.offsetHeight;
let viewportWidth        = window.innerWidth;
let sections             = document.querySelectorAll('section');


// Set-up

function isLargeScreenNow() {
    if (viewportWidth > 1024) {
        return true
    } else {
        return false
    };
};

function setMobileBrowserHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function setNavMenuWidth() {
    let navMenuWidth = document.querySelector('.header').offsetWidth;
    document.documentElement.style.setProperty('--nav-width', `${navMenuWidth}px`);
}

const headerVisibility = () => {
    if ((window.pageYOffset >= ((welcomeSectionHeight / 3 ) - mobileHeaderHeight)) && viewportWidth <= 1024) {
        mobileHeader.classList.add('visible')
    } else {
        mobileHeader.classList.remove('visible')
    }
}

function bodyLock() {
    document.body.classList.add('lock');
    document.documentElement.classList.add('lock');
};

function bodyUnlock() {
    document.body.classList.remove('lock');
    document.documentElement.classList.remove('lock');
};

setMobileBrowserHeight();
setNavMenuWidth();
headerVisibility();

window.addEventListener('resize', () => {
    viewportWidth = window.innerWidth;
    setMobileBrowserHeight();
    headerVisibility();
});
window.addEventListener("scroll", headerVisibility);

// Burger

burgerBtn.addEventListener('click', () => {
    if(burgerBtn.classList.contains('show-burger')) {
        closeBurger();
        overlay.removeEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    } else {
        sectionScroll();
        bodyLock();
        overlay.classList.add('show');
        wrapper.classList.add('show-menu');
        burgerBtn.classList.add('show-burger');
        overlay.addEventListener('click', function(e) {
            if(e.target === overlay) {
                closeBurger();
            }
        });
    };
});

const closeBurger = () => {
    burgerBtn.classList.remove('show-burger');
    overlay.classList.remove('show');
    wrapper.classList.remove('show-menu');
    bodyUnlock();
}

function sectionScroll() {
    for (let section of sections) {
        let headerOffset = mobileHeaderHeight;
        if(isLargeScreenNow()) {
            headerOffset = 0;
        };
        if (scrollY >= (section.offsetTop - headerOffset)) {
            const navID ="#" + section.getAttribute('id');
            let nav = document.querySelector(`a[href="${navID}"]`);
            anchors.forEach(btn => btn.classList.remove('active'));
            nav.classList.add('active');
        };
    };
};

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

