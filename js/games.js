// ======================================
// ELEMENTS
// ======================================

const playButtons = document.querySelectorAll(".play-btn");
const startBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restart-game");

const currentWordEl = document.getElementById("current-word");
const input = document.getElementById("game-input");

const scoreEl = document.getElementById("game-score");
const livesEl = document.getElementById("game-lives");
const timerEl = document.getElementById("game-timer");
const highScoreEl = document.getElementById("high-score");

const logoutBtn = document.getElementById("logout-btn");
const welcomeUser = document.getElementById("welcome-user");

// ======================================
// USER
// ======================================

const username =
localStorage.getItem("typingAthleteUser") || "Guest";

welcomeUser.textContent =
"Welcome, " + username + " 👋";

// ======================================
// GAME VARIABLES
// ======================================

let currentMode = "wordrush";
let currentWord = "";

let score = 0;
let lives = 3;
let timer = 60;

let gameRunning = false;
let timerInterval;

// ======================================
// HIGH SCORE
// ======================================

let highScore =
Number(localStorage.getItem("gameHighScore")) || 0;

highScoreEl.textContent = highScore;

// ======================================
// WORD LIST
// ======================================

const words = [

"keyboard",
"speed",
"accuracy",
"coding",
"javascript",
"typing",
"athlete",
"computer",
"monitor",
"internet",

"practice",
"winner",
"challenge",
"future",
"victory",
"performance",
"gaming",
"website",
"developer",
"technology",

"success",
"browser",
"function",
"variable",
"coding",
"fitness",
"random",
"rocket",
"leaderboard",
"profile"

];

// ======================================
// LOAD RANDOM WORD
// ======================================

function loadWord(){

    const randomIndex =
    Math.floor(Math.random() * words.length);

    currentWord = words[randomIndex];

    currentWordEl.textContent = currentWord;

}

// ======================================
// SELECT GAME MODE
// ======================================

playButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        currentMode = button.dataset.mode;

        gameRunning = false;

        input.disabled = true;
        input.value = "";

        score = 0;
        lives = 3;

        scoreEl.textContent = score;
        livesEl.textContent = lives;

        switch(currentMode){

            case "wordrush":

                timer = 60;
                break;

            case "timeattack":

                timer = 30;
                break;

            case "survival":

                timer = 999;
                break;

            case "zen":

                timer = "∞";
                break;

        }

        timerEl.textContent = timer;

        currentWordEl.textContent =
        "Press Start Game";

    });

});

// ======================================
// START GAME
// ======================================

startBtn.addEventListener("click",()=>{

    gameRunning = true;

    score = 0;
    lives = 3;

    scoreEl.textContent = score;
    livesEl.textContent = lives;

    input.disabled = false;
    input.value = "";
    input.focus();

    loadWord();

    clearInterval(timerInterval);

    if(currentMode !== "zen"){

        let timeLeft =
        currentMode === "timeattack" ? 30 :
        currentMode === "survival" ? 999 : 60;

        timerEl.textContent = timeLeft;

        timerInterval = setInterval(()=>{

            if(currentMode !== "survival"){

                timeLeft--;

                timerEl.textContent = timeLeft;

                if(timeLeft <= 0){

                    endGame();

                }

            }

        },1000);

    }else{

        timerEl.textContent = "∞";

    }

});

// ======================================
// TYPING LOGIC
// ======================================

input.addEventListener("input",()=>{

    if(!gameRunning) return;

    const typed = input.value.trim();

    if(typed === currentWord){

        score++;

        scoreEl.textContent = score;

        input.value = "";

        // Save High Score
        if(score > highScore){

            highScore = score;

            highScoreEl.textContent = highScore;

            localStorage.setItem("gameHighScore",highScore);

        }

        loadWord();

    }

});

// ======================================
// SURVIVAL MODE
// ======================================

input.addEventListener("keydown",(e)=>{

    if(!gameRunning) return;

    if(currentMode !== "survival") return;

    if(e.key === "Enter"){

        if(input.value.trim() !== currentWord){

            lives--;

            livesEl.textContent = lives;

            input.value = "";

            if(lives <= 0){

                endGame();

            }

        }

    }

});

// ======================================
// END GAME
// ======================================

function endGame(){

    gameRunning = false;

    clearInterval(timerInterval);

    input.disabled = true;

    currentWordEl.textContent = "🎉 Game Over";

    alert(
`Game Over!

Score : ${score}

High Score : ${highScore}`
    );

}

// ======================================
// RESTART GAME
// ======================================

restartBtn.addEventListener("click",()=>{

    clearInterval(timerInterval);

    gameRunning = false;

    score = 0;
    lives = 3;

    scoreEl.textContent = score;
    livesEl.textContent = lives;

    input.value = "";
    input.disabled = true;

    timerEl.textContent =
    currentMode === "zen"
    ? "∞"
    : (currentMode === "timeattack" ? "30" :
       currentMode === "survival" ? "999" : "60");

    currentWordEl.textContent =
    "Press Start Game";

});

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("typingAthleteUser");

    window.location.href = "login.html";

});

// ======================================
// DEFAULT STATE
// ======================================

input.disabled = true;

scoreEl.textContent = "0";

livesEl.textContent = "3";

timerEl.textContent = "60";

highScoreEl.textContent = highScore;

currentWordEl.textContent =
"Press Start Game";