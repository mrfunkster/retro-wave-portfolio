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

function isLargeScreenNow() {
    if (viewportWidth > 768) {
        return true
    } else {
        return false
    };
};

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let navMenuWidth = document.querySelector('.header').offsetWidth;
document.documentElement.style.setProperty('--nav-width', `${navMenuWidth}px`);

const closeBurger = () => {
    burgerBtn.classList.remove('show-burger');
    overlay.classList.remove('show');
    wrapper.classList.remove('show-menu');
    setTimeout(()=>{
        document.body.classList.remove('lock');
    }, 350)    
}

const headerVisibility = () => {
    if ((window.pageYOffset >= ((welcomeSectionHeight / 3 ) - mobileHeaderHeight)) && viewportWidth <= 1024) {
        mobileHeader.classList.add('visible')
    } else {
        mobileHeader.classList.remove('visible')
    }
}

window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    viewportWidth = window.innerWidth;
    isLargeScreenNow();
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
        sectionScroll();
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

function sectionScroll() {
    for (let section of sections) {
        let headerOffset = mobileHeaderHeight;
        if(isLargeScreenNow) {
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


// Player
let playerNext              = document.querySelector('.player-next');
let playBtn                 = document.querySelector('.player-btn');
let visualizer              = document.querySelector('.visualizer');
let timeCode                = document.querySelector('.time-code');
let timeCodeSection         = document.querySelector('.time-code-section');
let timeBar                 = document.querySelector('.time-bar');
let timeBarSection          = document.querySelector('.time-bar-section');
let audioStatus             = document.querySelector('.audio-status');
let enableSoundOnLoadedPage = false;
let isPlaying               = false;
let currentTrack            = 0;
let audioContext            = null;
let lastGainValue           = 0;
let track, src, analyser, gainNode;
let fadeTime = 500;
let songList = [
    'audio/1.mp3',
    'audio/2.mp3',
    'audio/3.mp3',
    'audio/4.mp3',
];

if (enableSoundOnLoadedPage) {
    initialization();
    playSong();
}

function initialization() {
    track = document.createElement('audio');
    loadTrack(currentTrack);
}

function loadTrack(index) {
    track.src = songList[index];
    track.load();
}



function play() {
    if(!enableSoundOnLoadedPage) {
        initialization();
        playSong();
        enableSoundOnLoadedPage = true;
        timeCodeSection.classList.add('visible');
        visualizer.classList.add('visible');
        playerNext.classList.add('visible');
        playBtn.classList.remove('sided')
    } else if (isPlaying === false) {
        playSong();
    } else {
        pauseSong();
    }
}



function playSong() {
    if(!audioContext) {
        createVisualizer();
    };
    audioTimer();
    fadeIn();
    track.play();
    isPlaying = true;
    playBtn.innerHTML = '<img src="images/pause.webp" alt="">';
    track.onended = () => {
        nextSong()
    }
};

function pauseSong() {
    fadeOut();
    isPlaying = false;
    playBtn.innerHTML = '<img src="images/play.webp" alt="">';
};

function nextSong() {
    fadeOut();
    setTimeout(() => {
        let nextTrack = currentTrack + 1;
        if (nextTrack > songList.length - 1) {
            nextTrack = 0;
        }
        currentTrack = nextTrack;
        loadTrack(nextTrack);
        playSong();
    }, 500);
};

function fadeIn() {
    let i = lastGainValue
    function fade() {
        setTimeout(() => {
            gainNode.gain.value = (i / 100);
            lastGainValue = i;
            i++;
            if (i <= 100) {
                fade();
            }
        }, fadeTime/100);
    }
    fade();
}
function fadeOut() {
    let i = lastGainValue;
    function fade() {
        setTimeout(() => {
            gainNode.gain.value = (i / 100);
            lastGainValue = i;
            i--;
            if (i >= 0) {
                fade();
            }
        }, fadeTime/100)
    };
    fade();
    setTimeout(() => {
        track.pause();
    }, fadeTime);
};

function audioTimer() {
    window.requestAnimationFrame(audioTimer);
    let timeStamp = track.currentTime;
    let duration = track.duration;
    timeBarWidth(timeStamp, duration);
    timeCode.innerHTML = `${minutesConverter(timeStamp, duration)}:${secondsConverter(timeStamp, duration)}/${minutesConverter(duration)}:${secondsConverter(duration)}`;

}
function minutesConverter(seconds, duration = 0) {
    if (isNaN(seconds) || isNaN(duration)) {
        audioStatus.classList.add('visible');
        timeBarSection.classList.remove('visible');
        return '--'
    } else {
        audioStatus.classList.remove('visible');
        timeBarSection.classList.add('visible');
    };
    let minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
        return minutes;
    } else {
        return minutes;
    };
};
function secondsConverter(seconds, duration = 0) {
    if (isNaN(seconds) || isNaN(duration)) {
        return '--'
    };
    let sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = '0' + sec;
        return sec;
    } else {
        return sec;
    };
};
function timeBarWidth(seconds, duration) {
    let currentTime = Math.floor(seconds);
    let barWidth = (100 * currentTime) / duration;
    timeBar.style.width = barWidth + '%'
}


function createVisualizer() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    src = audioContext.createMediaElementSource(track);
    src.connect(analyser);
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    src.connect(gainNode);
    gainNode.connect(audioContext.destination);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const barCount = bufferLength / 2.67;

    for (i = 0; i < barCount; i++) {
        let visualizerSpan = document.createElement('span');
        visualizerSpan.classList.add('bar')
        visualizerSpan.style.width = `${visualizer.offsetWidth / barCount}px`
        visualizer.appendChild(visualizerSpan)
    }
    const bars = document.querySelectorAll('.bar');
    const dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
        window.requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < barCount; i++) {
            const barHeight = dataArray[i + 3] / 2.55;
            bars[i].style.height = barHeight + '%'
        }
    }
    renderFrame();
}


playBtn.addEventListener('click', play)
playerNext.addEventListener('click', nextSong)