let menuItemsImages = document.querySelectorAll('.menu-item-img');
let gallery         = document.querySelector('.gallery');
let closeGalleryBtn = document.querySelector('.gallery-close');
let galleryNext     = document.querySelector('.gallery-next');
let galleryPrev     = document.querySelector('.gallery-prev');
let galleryCount    = document.querySelector('.gallery-count');
let galleryLoader   = document.querySelector('.gallery-loader');

let images = [
    [
        'images/menu/0/01.webp',
        'images/menu/0/02.webp',
        'images/menu/0/03.webp',
        'images/menu/0/04.webp'
    ],
    [
        'images/menu/1/01.webp',
        'images/menu/1/02.webp',
        'images/menu/1/03.webp',
        'images/menu/1/04.webp',
        'images/menu/1/05.webp',
        'images/menu/1/06.webp',
    ],
    [
        'images/menu/2/01.webp',
        'images/menu/2/02.webp',
        'images/menu/2/03.webp',
        'images/menu/2/04.webp'
    ],
    [
        'images/menu/3/01.webp',
        'images/menu/3/02.webp',
        'images/menu/3/03.webp',
        'images/menu/3/04.webp',
        'images/menu/3/05.webp',
        'images/menu/3/06.webp',
    ],
    [
        'images/menu/4/01.webp',
        'images/menu/4/02.webp',
        'images/menu/4/03.webp',
        'images/menu/4/04.webp',
        'images/menu/4/05.webp',
    ],
    [
        'images/menu/5/01.webp',
        'images/menu/5/02.webp',
        'images/menu/5/03.webp',
    ],
    [
        'images/menu/6/01.webp',
        'images/menu/6/02.webp',
        'images/menu/6/03.webp',
        'images/menu/6/04.webp',
        'images/menu/6/05.webp',
        'images/menu/6/06.webp',
    ]
];

function galleryListeners() {
    for (let i = 0; i < menuItemsImages.length; i++) {
        menuItemsImages[i].addEventListener('click', function() {
            if(images[i].length) {
                createGallery(i);
            } else {
                alert('Gallery for this element is empty yet!')
            }
        });
    };
};

function createGallery(index) {
    let imgArray = images[index];
    let imageNumber = 0;
    let touchStartX;

    createGalleryElements();

    
    gallery.classList.add('visible');
    bodyLock();

    updateCounter(imageNumber);
    addLoader();

    function createGalleryElements() {
        element = document.createElement('div');
        element.classList.add('gallery-element');
        gallery.appendChild(element);
        image = document.createElement('img');
        element.appendChild(image);
        image.src = imgArray[imageNumber];
        image.onload = imageLoaded;
    }

    function closeGallery() {
        bodyUnlock();
        removeAllGalleryEventListener();
        gallery.classList.remove('visible');
        element.remove();
    };

    function removeAllGalleryEventListener() {
        document.removeEventListener('keydown', keyDownListener);
        closeGalleryBtn.removeEventListener('click', closeGallery);
        galleryNext.removeEventListener('click', nextImage);
        galleryPrev.removeEventListener('click', prevImage);
        gallery.removeEventListener('click', isOverlay);
        element.removeEventListener('touchstart', touchStart);
        element.removeEventListener('touchend', touchEnd);
    };

    function imageLoaded() {
        galleryLoader.classList.remove('visible');
        image.style.display = 'block';
    };

    function addLoader() {
        galleryLoader.classList.add('visible');
        image.style.display = 'none'
    };

    function nextImage() {
        addLoader();
        imageNumber++;
        if(imageNumber >= imgArray.length) {
            imageNumber = 0;
        };
        image.src = imgArray[imageNumber];
        image.onload = imageLoaded;
        updateCounter(imageNumber);
    };

    function prevImage() {
        addLoader();
        imageNumber--;
        if(imageNumber < 0) {
            imageNumber = imgArray.length - 1
        };
        image.src = imgArray[imageNumber];
        image.onload = imageLoaded;
        updateCounter(imageNumber);
    };

    function updateCounter(number) {
        galleryCount.innerHTML = `${number + 1}/${imgArray.length}`
    };

    function keyDownListener(e) {
        if(e.key === 'Escape') {
            closeGallery();
        } else if(e.keyCode === 39) {
            nextImage();
        } else if(e.keyCode === 37) {
            prevImage();
        };
    }
    
    function isOverlay(e) {
        if(e.target === gallery) {
            closeGallery();
        }
    }

    function touchStart(e) {
        touchStartX = Math.floor(e.targetTouches[0].pageX);
    }
    function touchEnd(e) {
        let touchEndX = Math.floor(e.changedTouches[0].pageX);
        let diff = touchStartX - touchEndX;
        if(diff > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }

    element.addEventListener('touchstart', touchStart);
    element.addEventListener('touchend', touchEnd);

    closeGalleryBtn.addEventListener('click', closeGallery);
    galleryNext.addEventListener('click', nextImage);
    galleryPrev.addEventListener('click', prevImage);
    document.addEventListener('keydown', keyDownListener);
    gallery.addEventListener('click', isOverlay);
}

