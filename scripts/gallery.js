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
];



for (let i = 0; i < menuItemsImages.length; i++) {
    menuItemsImages[i].addEventListener('click', function() {
        if(images[i].length) {
            createGallery(i);
        } else {
            alert('Gallery for this element is empty yet!')
        }
    });
};

function createGallery(index) {
    let imgArray = images[index];
    let imageNumber = 0;
    // let closeGalleryBtn, galleryNext, galleryPrev, galleryCount, galleryLoader;

    createGalleryElements();

    
    gallery.classList.add('visible');
    bodyLock();

    updateCounter(imageNumber);
    addLoader();

    function createGalleryElements() {
        element = document.createElement('div');
        element.classList.add('gallery-element');
        gallery.appendChild(element);

        // closeGalleryBtn = document.createElement('div');
        // closeGalleryBtn.innerHTML = 'X';
        // closeGalleryBtn.classList.add('gallery-close');
        // gallery.appendChild(closeGalleryBtn);

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

    closeGalleryBtn.addEventListener('click', closeGallery);
    galleryNext.addEventListener('click', nextImage);
    galleryPrev.addEventListener('click', prevImage);
    document.addEventListener('keydown', keyDownListener);
    gallery.addEventListener('click', isOverlay);
}

