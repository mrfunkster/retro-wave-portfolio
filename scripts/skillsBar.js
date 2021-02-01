let typingParagraph = document.querySelector('.text-typing');
let dialogueBody    = document.querySelector('.dialogue-section');
let skillBarSection = document.querySelector('.skills-section');
let bartenderMouth  = document.querySelector('.bartender-mouth');
let isDone = false;
let index = 0;
let charCount = 0;
let currentText = '';
let letter = '';


let textArray = [
    "Hello and Welcome to my Skills Bar! I Will make for you a my best skill-coctails tonight. If You interested in it, just show me bottle, that you want to drink!",
]

function textTyping(index) {
    dialogueBody.classList.add('visible');
    currentText = textArray[index];
    setTimeout(() => {
        bartenderMouth.classList.add('speaking');
        let i = 0;
        function typing() {
            setTimeout(() => {
                letter = currentText.slice(0, ++i);
                typingParagraph.innerHTML = letter;
                if(i <= currentText.length) {
                    typing();
                } else {
                    bartenderMouth.classList.remove('speaking');
                }
            }, 100);
        };
        typing();
    }, 100)
};

function startTyping() {
    if(window.scrollY >= skillBarSection.offsetTop && !isDone) {
        textTyping(0);
        isDone = true;
    }
}

window.addEventListener('scroll', startTyping)