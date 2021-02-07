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
        if (!isLargeScreenNow()) {
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

// Form

function postForm() {
    const form = document.getElementById('form');
    const name = document.getElementById('input-name');
    const email = document.getElementById('input-email');
    const message = document.getElementById('input-message');
    const submitButton = document.querySelector('.submit-button');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        
        let error = formValidate(form);

        let formData = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        if (error === 0) {
            submitButton.innerHTML = '<img src="images/loader-spinner.svg" alt="">';            
            sendMail(formData);
            form.reset();
        } else {
            modalMessage("Please, enter a <span>correct</span> information!", "error");
        }
    };

    function sendMail(data) {
        Email.send({
            Host: "smtp.gmail.com",
            Username: 'retrowaveportfolio@gmail.com',
            Password: "sxyrdwlbdpnolvxt",
            To: "mr.funksters@gmail.com",
            From: 'retrowaveportfolio@gmail.com',
            Subject: `${data.name} sent you a message from RetroWave Portfolio Web Site`,
            Body: `<h1>${data.name} sent you a message from RetroWave Portfolio Web Site. Please, reply for this message!</h1><br/> <b>Name:</b> ${data.name} <br/> <b>E-mail:</b> <a href="${data.email}">${data.email}</a> <br/> <b>Message:</b> ${data.message}`,
        }).then(message => {
            console.log(message);
            submitButton.innerHTML = 'Submit';
            modalMessage(`<span>${data.name}</span>, You're message successfuly sended! Thank You!`, "success");
        })
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            input.addEventListener('focus', () => {formRemoveError(input)});
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    input.value = '';
                    input.placeholder = "Enter correct E-mail!";
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error
    };

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };
}


// Modal Window

function modalMessage(text, type) {
    let modal = document.querySelector('.modal');
    let closeModalBtn = document.querySelector('.modal-close');
    let modalMessage = document.querySelector('.modal-message');
    let modalHeader = document.querySelector('.modal-header');
    let modalWindow = document.querySelector('.modal-window');
    let modalButton = document.querySelector('.modal-button'); 

    modalMessage.innerHTML = text;
    if(type === 'error') {
        modalHeader.innerHTML = 'Oops, something wrong...';
    } else if (type === 'success') {
        modalHeader.innerHTML = 'Well Done!'
    }

    showModal();

    function showModal() {
        addModalEventListeners();
        bodyLock();
        modal.classList.add('visible');
        modalWindow.classList.add(type);
    };

    function closeModal() {
        removeModalEventListeners();
        modal.classList.remove('visible');
        modalWindow.classList.remove(type);
        setTimeout(bodyUnlock, 500);
    };

    function keyDownListener(e) {
        if(e.key === 'Escape') {
            closeModal();
        };
    }

    function addModalEventListeners() {
        document.addEventListener('keydown', keyDownListener);
        modalButton.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            };
        });
    }

    function removeModalEventListeners() {
        document.removeEventListener('keydown', keyDownListener);
        modalButton.removeEventListener('click', closeModal);
        closeModalBtn.removeEventListener('click', closeModal);
        modal.removeEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            };
        });
    }
}


window.addEventListener('load', () => {
    console.log("Page loaded. Event Listeners is initializing...")
    addPlayerEventListeners();
    skillBarListening();
    galleryListeners();
    postForm();
    console.log("Page is ready!")
});


// sxyrdwlbdpnolvxt