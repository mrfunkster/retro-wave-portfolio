let
    waitTime            = 1000;
    images              = document.images,
    imagesTotalCount    = images.length,
    imagesLoadedCount   = 0,
    preloader           = document.getElementById('page-preloader'),
    preloaderContent    = document.getElementById('preloader-content');
    percDisplay         = document.getElementById('load-perc');
    progressBar         = document.querySelector('.loading-progress-bar');

for( let i = 0; i < imagesTotalCount; i++ ) {
     imageClone = new Image();
     imageClone.onload  = imageLoaded;
     imageClone.onerror = imageLoaded;
     imageClone.src     = images[i].src;
}

function bodyLock() {
    document.body.classList.add('lock');
    document.documentElement.classList.add('lock');
};

function bodyUnlock() {
    document.body.classList.remove('lock');
    document.documentElement.classList.remove('lock');
};

bodyLock();

function imageLoaded() {
    imagesLoadedCount++;
    let progress = (( (100/ imagesTotalCount) * imagesLoadedCount ) << 0) + '%';
    percDisplay.innerHTML = progress;
    progressBar.style.width = progress;

    if( imagesLoadedCount >= imagesTotalCount) {
        setTimeout (function() {
            if( !preloader.classList.contains('done'))
            {
                preloader.classList.add('done');
                bodyUnlock();
            }
        }, waitTime);
    }
}