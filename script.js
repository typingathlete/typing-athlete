document.getElementById("playerName").innerText =
"👤 " + (localStorage.getItem("player") || "Guest");
const progressBar = document.getElementById("progressBar");
const themeBtn = document.getElementById("themeBtn");
const popup = document.getElementById("resultPopup");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalErrors = document.getElementById("finalErrors");
const closePopup = document.getElementById("closePopup");
const timeSelect = document.getElementById("timeSelect");
const restartBtn = document.getElementById("restartBtn");
const quotes = [
"Learning to type faster takes regular practice and patience.",
"Programming is the art of solving problems using logic.",
"Practice every day to improve your typing accuracy.",
"Technology is changing the world at an incredible pace.",
"Success comes from hard work and consistency.",
"The quick brown fox jumps over the lazy dog.",
"Typing quickly is useful but accuracy is even more important.",
"Dream big, work hard, and never give up.",
"Every expert was once a beginner.",
"Knowledge grows when it is shared with others."
];

const quote = document.getElementById("quote");
const input = document.getElementById("input");
const startBtn = document.getElementById("startBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const errors = document.getElementById("errors");

let time = 60;
let countdown;
let started = false;
let currentText = "";

function loadQuote() {
  currentText = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerHTML = "";

  currentText.split("").forEach(letter => {
    const span = document.createElement("span");
    span.innerText = letter;
    quote.appendChild(span);
  });

  input.value = "";
}

startBtn.addEventListener("click", () => {
  if (started) return;

  time = parseInt(timeSelect.value);
timer.innerText = time;
  started = true;
  input.disabled = false;
  input.focus();

  loadQuote();

  countdown = setInterval(() => {
    time--;
    timer.innerText = time;

    if (time <= 0) {
      clearInterval(countdown);
      input.disabled = true;
       finalWpm.innerText = wpm.innerText;
finalAccuracy.innerText = accuracy.innerText;
finalErrors.innerText = errors.innerText;

popup.style.display = "flex";
    }
  }, 1000);
});

input.addEventListener("input", () => {
  const typed = input.value.split("");
  const chars = quote.querySelectorAll("span");

  let errorCount = 0;

  chars.forEach((char, index) => {
    char.className = "";

    if (typed[index] == null) {
      return;
    }

    if (typed[index] === char.innerText) {
      char.classList.add("correct");
    } else {
      char.classList.add("incorrect");
      errorCount++;
    }
  let progress = (input.value.length / currentText.length) * 100;
progressBar.style.width = progress + "%";
  });

  errors.innerText = errorCount;

  const totalTyped = input.value.length;

  if (totalTyped > 0) {
    const acc = Math.round(((totalTyped - errorCount) / totalTyped) * 100);
    accuracy.innerText = acc + "%";
  }

  const elapsed = (60 - time) / 60;

  if (elapsed > 0) {
    const words = input.value.trim().split(/\s+/).length;
    wpm.innerText = Math.round(words / elapsed);
  }
});
restartBtn.addEventListener("click", () => {
    clearInterval(countdown);

    time = 60;
    timer.innerText = time;

    started = false;

    input.value = "";
    input.disabled = true;

    wpm.innerText = "0";
    accuracy.innerText = "100%";
    errors.innerText = "0";
  
  progressBar.style.width = "0%";

    quote.innerHTML = "Click Start to begin...";
});
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.innerText = "🌙 Dark";
    }else{
        themeBtn.innerText = "☀️ Light";
    }
});