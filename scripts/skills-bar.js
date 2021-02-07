let typingParagraph = document.querySelector('.text-typing');
let dialogueBody    = document.querySelector('.dialogue-section');
let skillBarSection = document.querySelector('.skills-section');
let bartenderMouth  = document.querySelector('.bartender-mouth');
let bottles         = document.querySelectorAll('.bottle');
let bottlesContainer = document.querySelector('.bottles');
let letterItterator = 0;
let isScrolled = false;
let isDone = false;
let index = 0;
let charCount = 0;
let currentText = '';
let letter = '';


let textArray = [
    "Hello and Welcome to my Skills Bar! I Will make for you a my best skill-coctails tonight. If You interested in it, just show me bottle, that you want to drink!",
    "Oh! It's right choice! This cocktail includes old fashion HTML5 spiced with sweet CSS! Delicious!",
    "The aging and light bitterness of this based on JavaScript(ES6+) with jQuery spices drink will leave you indifferent!",
    "The combination of React and Redux technologies can blow your mind. Please, be careful!",
    'If you are a serious person, you cannot live without "GIT" liquor!',
    "So, this drink is hard not to recognize, because it's name sounds loudly in English(intermediate), in Ukrainian(native) and in Russian(native).",
    "Just meet a SCRUM-based wine with applause!",
    'The most precious alcohol of the "Team Player" variety is poured inside this bottle!',
    "Only a drink that can accumulate aging over the years and learn everything new deserves to be under this lid.",
]

function textTyping(index) {
    dialogueBody.classList.add('visible');
    currentText = textArray[index];
    let letterItterator = 0;
    setTimeout(() => {
        bartenderMouth.classList.add('speaking');
        function typing() {
            setTimeout(() => {
                letter = currentText.slice(0, ++letterItterator);
                typingParagraph.innerHTML = letter;
                if(letterItterator <= currentText.length) {
                    typing();
                } else {
                    bartenderMouth.classList.remove('speaking');
                    if(!isDone) {
                        addListenerToBottles();
                        bottlesContainer.classList.add('active');
                        isDone = true;
                    }
                }
            }, 50);
        };
        typing();
    }, 100)
};


function startTyping() {
    let scrollOffset = 0
    if(!isLargeScreenNow()) {
        scrollOffset = mobileHeaderHeight
    }
    if((window.scrollY >= (skillBarSection.offsetTop - scrollOffset - 1)) && !isScrolled) {
        textTyping(0);
        isScrolled = true;
        window.removeEventListener('scroll', startTyping);
    };
};

function addListenerToBottles() {
    for(let i = 0; i < bottles.length; i++) {
        bottles[i].classList.add('active');
        bottles[i].addEventListener('click', () => {
            clickOnBottle(i);
        });
    };
};

function clickOnBottle(bottle) {
    clearDialogue();
    setTimeout(() => {
        textTyping(bottle + 1);
    }, 100);
};

function clearDialogue() {
    bartenderMouth.classList.remove('speaking');
    currentText = '';
};

function skillBarListening() {
    window.addEventListener('scroll', startTyping);
};

