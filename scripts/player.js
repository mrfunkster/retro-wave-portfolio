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
let isFadeAfterLoading, isTrackLoaded, isFadeIn, isFadeOut;
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
    track.onended = nextSong;
    track.oncanplay = canPlay;
    track.onloadstart = trackLoading;
    loadTrack(currentTrack);
}

function loadTrack(index) {
    isFadeAfterLoading = true;
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
    console.log('playSong()')
    if(!audioContext) {
        createVisualizer();
    };
    isPlaying = true;
    audioTimer();
    track.play();
    if(!isFadeAfterLoading) {
        fadeIn();
    };
    if(isTrackLoaded) {
        playBtn.innerHTML = '<img src="images/pause-ico.svg" alt="">';
    }
};

function canPlay() {
    fadeIn();
    isFadeAfterLoading = false;
    isTrackLoaded = true;
    playBtn.innerHTML = '<img src="images/pause-ico.svg" alt="">';
    audioStatus.classList.remove('visible');
    timeBarSection.classList.add('visible');
};

function trackLoading() {
    isTrackLoaded = false;
    playBtn.innerHTML = '<img src="images/loader-spinner.svg" alt="">';
    audioStatus.classList.add('visible');
    timeBarSection.classList.remove('visible');
}

function pauseSong() {
    console.log('pauseSong()')
    fadeOut();
    isPlaying = false;
    playBtn.innerHTML = '<img src="images/play-ico.svg" alt="">';
};

function nextSong() {
    console.log('nextSong()')

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
    isFadeIn = true;
    console.log(`fadeIn(), start value = ${lastGainValue}`);
    let i = lastGainValue;
    function fadeUp() {
        setTimeout(() => {
            if(isFadeOut) {
                isFadeIn = false;
                console.log(`Fade IN is INTERRUPTED at value = ${lastGainValue}`);
                return
            };
            gainNode.gain.value = (i / 100);
            i++;
            lastGainValue = i;
            if (i < 100) {
                fadeUp();
            } else {
                isFadeIn = false;
                console.log("Fade In is Done!")
            }
        }, fadeTime/100);
    }
    fadeUp();
}
function fadeOut() {
    isFadeOut = true;

    console.log(`fadeOut(), start value = ${lastGainValue}`)

    removePlayerEventListeners();

    let i = lastGainValue;

    function fadeDown() {
        setTimeout(() => {
            if(isFadeIn) {
                isFadeOut = false;
                console.log(`Fade OUT is INTERRUPTED at value = ${lastGainValue}`);
                return
            };
            gainNode.gain.value = (i / 100);
            i--;
            lastGainValue = i;
            if (i > 0) {
                fadeDown();
            } else {
                isFadeOut = false;
            }
        }, fadeTime/150)
    };
    fadeDown();
    setTimeout(() => {
        track.pause();
        addPlayerEventListeners();
    }, fadeTime);
};




function audioTimer() {
    let timerAnimation = requestAnimationFrame(audioTimer);
    if(!isPlaying) {
        cancelAnimationFrame(timerAnimation);
    };
    let timeStamp = track.currentTime;
    let duration = track.duration;
    timeBarWidth(timeStamp, duration);
    timeCode.innerHTML = `${minutesConverter(timeStamp, duration)}:${secondsConverter(timeStamp, duration)}/${minutesConverter(duration)}:${secondsConverter(duration)}`;
};

function minutesConverter(seconds, duration = 0) {
    if (isNaN(seconds) || isNaN(duration)) {
        return '--'
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

function trackSeeking(e) {
    let onBarPosition = track.duration * (e.offsetX / 100);
    track.currentTime = onBarPosition;
}

function removePlayerEventListeners() {
    playBtn.removeEventListener('click', play);
    playerNext.removeEventListener('click', nextSong);
    timeBarSection.removeEventListener('click', trackSeeking);
}

function addPlayerEventListeners() {
    playBtn.addEventListener('click', play);
    playerNext.addEventListener('click', nextSong);
    timeBarSection.addEventListener('click', trackSeeking);
}

window.addEventListener('load', addPlayerEventListeners);