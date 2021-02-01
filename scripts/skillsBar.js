let typingParagraph = document.querySelector('.text-typing');
let dialogueBody    = document.querySelector('.dialogue-section');
let skillBarSection = document.querySelector('.skills-section');
let bartenderMouth  = document.querySelector('.bartender-mouth');
let bottles         = document.querySelectorAll('.bottle');
let bottlesContainer = document.querySelector('.bottles');
let letterItterator = 0;
let isDone = false;
let index = 0;
let charCount = 0;
let currentText = '';
let letter = '';


let textArray = [
    "Hello and Welcome to my Skills Bar! I Will make for you a my best skill-coctails tonight. If You interested in it, just show me bottle, that you want to drink!",
    "My First Skii",
    "My Second Skii",
    "My Third Skii",
    "My Fourth Skii",
    "My Fifth Skii",
    "My Sixth Skii",
    "My Seventh Skii",
    "My Eighth Skii",
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
            }, 75);
        };
        typing();
    }, 100)
};



function startTyping() {
    if(window.scrollY >= skillBarSection.offsetTop && !isDone) {
        textTyping(0);
    }
}

function addListenerToBottles() {
    for(let i = 0; i < bottles.length; i++) {
        bottles[i].classList.add('active');
        bottles[i].addEventListener('click', () => {
            clickOnBottle(i);
        });
    }
}

function clickOnBottle(bottle) {
    clearDialogue();
    setTimeout(() => {
        textTyping(bottle + 1);
    }, 100)
}

function clearDialogue() {
    bartenderMouth.classList.remove('speaking');
    currentText = '';
}

window.addEventListener('scroll', startTyping)

