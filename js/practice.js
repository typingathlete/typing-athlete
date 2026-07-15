// =====================================
// ELEMENTS
// =====================================

const keySound = new Audio("sounds/key.mp3");
const errorSound = new Audio("sounds/error.mp3");

keySound.volume = 0.25;
errorSound.volume = 0.35;

const keyboard = document.getElementById("virtual-keyboard");
const keys = document.querySelectorAll(".key");
const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const errors = document.getElementById("errors");
const bestWPM = document.getElementById("best-wpm");

const typingText = document.getElementById("typing-text");
const input = document.getElementById("typing-input");

const restartBtn = document.getElementById("restart-btn");

const resultPopup = document.getElementById("result-popup");
const finalWPM = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalErrors = document.getElementById("final-errors");
const playAgain = document.getElementById("play-again");

const progressBar = document.getElementById("progress-bar");

const timeButtons = document.querySelectorAll(".time-btn");

const historyList = document.getElementById("history-list");

// =====================================
// VARIABLES
// =====================================

let selectedTime = 15;
let time = selectedTime;

let timerStarted = false;
let interval = null;

let currentText = "";

let mistakes = 0;

let totalCharactersTyped = 0;
let totalCorrectCharacters = 0;
let totalMistakes = 0;

// =====================================
// BEST WPM
// =====================================

const savedBest = localStorage.getItem("bestWPM");

if(savedBest){

    bestWPM.textContent = savedBest;

}

// =====================================
// LOAD PARAGRAPH
// =====================================

function loadText(){

    input.value = "";

    typingText.innerHTML = "";

    progressBar.style.width = "0%";

    currentText =
    paragraphs[Math.floor(Math.random()*paragraphs.length)];

    currentText.split("").forEach(char=>{

        const span = document.createElement("span");

        span.innerText = char;

        typingText.appendChild(span);

    });

    const first =
    typingText.querySelector("span");

    if(first){

        first.classList.add("current");

    }

    updateExpectedKey();

}


// =====================================
// TIMER
// =====================================

function startTimer(){

    interval = setInterval(()=>{

        time--;

        timer.textContent = time;

        if(time <= 0){

            clearInterval(interval);

            input.disabled = true;

            showResult();

        }

    },1000);

}

// =====================================
// RESULT
// =====================================

function showResult(){

    finalWPM.textContent = wpm.textContent;
    finalAccuracy.textContent = accuracy.textContent;
    finalErrors.textContent = errors.textContent;

    resultPopup.classList.add("show");

    keyboard.classList.remove("show");

    // Best WPM
    const current = Number(wpm.textContent);
    const best = Number(localStorage.getItem("bestWPM") || 0);

    if(current > best){

        localStorage.setItem("bestWPM", current);

        bestWPM.textContent = current;

    }

    // Save History
    const history =
    JSON.parse(localStorage.getItem("typingHistory")) || [];

    history.unshift({

        date:new Date().toLocaleDateString(),

        wpm:wpm.textContent,

        accuracy:accuracy.textContent,

        errors:errors.textContent

    });

    history.splice(10);

    localStorage.setItem(
        "typingHistory",
        JSON.stringify(history)
    );

    loadHistory();

}

// =====================================
// HISTORY
// =====================================

function loadHistory(){

    if(!historyList) return;

    const history =
    JSON.parse(localStorage.getItem("typingHistory")) || [];

    historyList.innerHTML = "";

    history.forEach(item=>{

        historyList.innerHTML += `

        <div class="history-card">

            <span>${item.date}</span>

            <strong>${item.wpm}</strong>

            <strong>${item.accuracy}</strong>

            <strong>${item.errors}</strong>

        </div>

        `;

    });

}

// =====================================
// TYPING ENGINE
// =====================================

input.addEventListener("input", () => {

    // Start timer on first key press
    if(!timerStarted){

       timerStarted = true;

       keyboard.classList.add("show");

       startTimer();

    }

    const characters = typingText.querySelectorAll("span");

    const typed = input.value.split("");

    mistakes = 0;

    characters.forEach((span,index)=>{

        span.classList.remove(
            "correct",
            "incorrect",
            "current"
        );

        const typedChar = typed[index];

        if(typedChar == null){

            // Not typed yet

        }

       else if(typedChar === span.innerText){

            span.classList.add("correct");

            keySound.currentTime = 0;
            keySound.play();

        }

        else{

            span.classList.add("incorrect");

            mistakes++;

            errorSound.currentTime = 0;
            errorSound.play();


        }

    });

    // Current Cursor

    if(typed.length < characters.length){

        characters[typed.length].classList.add("current");

    }

    // Progress Bar

    const progress =
    (typed.length / currentText.length) * 100;

    progressBar.style.width = progress + "%";

    // Live Stats

    const typedNow =
    totalCharactersTyped + typed.length;

    const correctNow =
    totalCorrectCharacters + (typed.length - mistakes);

    errors.textContent =
    totalMistakes + mistakes;

    // Accuracy

    let acc = 100;

    if(typedNow > 0){

        acc = Math.round(
            (correctNow / typedNow) * 100
        );

    }

    accuracy.textContent = acc + "%";

    // WPM

    const elapsedSeconds =
    selectedTime - time;

    const elapsedMinutes =
    elapsedSeconds / 60;

    let currentWPM = 0;

    if(elapsedMinutes > 0){

        currentWPM = Math.round(
            ((typedNow / 5) / elapsedMinutes)
        );

    }

    wpm.textContent = currentWPM;

    // Paragraph Complete

    if(typed.length >= currentText.length){

        totalCharactersTyped += typed.length;

        totalCorrectCharacters +=
        (typed.length - mistakes);

        totalMistakes += mistakes;

        loadText();


    }

    updateExpectedKey();

});

// =====================================
// RESTART TEST
// =====================================

function resetTest(){

    clearInterval(interval);

    timerStarted = false;

    time = selectedTime;

    timer.textContent = time;

    input.disabled = false;

    mistakes = 0;

    totalCharactersTyped = 0;
    totalCorrectCharacters = 0;
    totalMistakes = 0;

    wpm.textContent = "0";
    accuracy.textContent = "100%";
    errors.textContent = "0";

    resultPopup.classList.remove("show");

    loadText();

    keyboard.classList.remove("show");

    input.focus();

}

restartBtn.addEventListener("click", resetTest);

playAgain.addEventListener("click", resetTest);

// =====================================
// TIME BUTTONS
// =====================================

timeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        if(timerStarted) return;

        timeButtons.forEach(btn=>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedTime =
        Number(button.dataset.time);

        time = selectedTime;

        timer.textContent = selectedTime;

    });

});

// =====================================
// INITIALIZE
// =====================================

loadText();

keyboard.classList.remove("show");

loadHistory();

timer.textContent = selectedTime;

// ============================
// Virtual Keyboard
// ============================

document.addEventListener("keydown",(e)=>{

    let pressed = e.key.toUpperCase();

    if(pressed === " "){
        pressed = "SPACE";
    }

    const expectedChar = currentText[input.value.length];

    let expected = expectedChar ? expectedChar.toUpperCase() : "";

    if(expected === " "){
       expected = "SPACE";
    }

    if(pressed !== expected){
       flashWrongKey(pressed);
    }


    keys.forEach(key=>{

        if(key.innerText === pressed){

            key.classList.add("active");

        }

    });

});

function flashWrongKey(keyName){

    keys.forEach(key=>{

        if(key.innerText === keyName){

            key.classList.add("wrong");

            setTimeout(()=>{

                key.classList.remove("wrong");

            },150);

        }

    });

}

document.addEventListener("keyup",(e)=>{

    let released = e.key.toUpperCase();

    if(released === " "){
        released = "SPACE";
    }

    keys.forEach(key=>{

        if(key.innerText === released){

            key.classList.remove("active");

        }

    });

});

// ============================
// Expected Key Highlight
// ============================

function updateExpectedKey(){

    keys.forEach(key=>{

        key.classList.remove("next");

    });

    const typedLength = input.value.length;

    const nextChar = currentText[typedLength];

    if(!nextChar) return;

    let expected = nextChar.toUpperCase();

    if(expected === " "){

        expected = "SPACE";

    }

    keys.forEach(key=>{

        if(key.innerText === expected){

            key.classList.add("next");

        }

    });

}

// Show keyboard when typing box is focused

input.addEventListener("focus", () => {

    keyboard.classList.add("show");

});

keyboard.classList.remove("show");

// ============================
// Theme Toggle
// ============================

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){

    document.body.classList.add("light");

    themeToggle.textContent = "☀️";

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeToggle.textContent = "☀️";

    }else{

        localStorage.setItem("theme","dark");

        themeToggle.textContent = "🌙";

    }

});