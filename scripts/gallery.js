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
    [],
    [],
    [],
    [],
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
    let element = document.createElement('div');
    let image = document.createElement('img');
    image.src = imgArray[imageNumber];
    image.onload = imageLoaded;
    element.classList.add('gallery-element');
    gallery.appendChild(element);
    element.appendChild(image);
    gallery.classList.add('visible');

    addLoader();

    function closeGallery() {
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

