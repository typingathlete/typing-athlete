// ======================================
// ELEMENTS
// ======================================

const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

const bestWPMEl = document.getElementById("best-wpm");
const bestAccuracyEl = document.getElementById("best-accuracy");
const totalTestsEl = document.getElementById("total-tests");
const totalXPEl = document.getElementById("total-xp");
const currentLevelEl = document.getElementById("current-level");
const charactersTypedEl = document.getElementById("characters-typed");

const averageWPMEl = document.getElementById("average-wpm");
const averageAccuracyEl = document.getElementById("average-accuracy");
const practiceTimeEl = document.getElementById("practice-time");

const weeklyTestsEl = document.getElementById("weekly-tests");
const weeklyWPMEl = document.getElementById("weekly-wpm");
const weeklyAccuracyEl = document.getElementById("weekly-accuracy");

// ======================================
// USER
// ======================================

const user =
localStorage.getItem("typingAthleteUser") || "Guest";

welcomeUser.textContent = "Welcome, " + user + " 👋";

// ======================================
// DATA
// ======================================

const bestWPM =
Number(localStorage.getItem("bestWPM") || 0);

const xp =
Number(localStorage.getItem("userXP") || 0);

const history =
JSON.parse(localStorage.getItem("typingHistory")) || [];

// ======================================
// CALCULATIONS
// ======================================

let highestAccuracy = 0;
let totalAccuracy = 0;
let totalWPM = 0;
let charactersTyped = 0;

history.forEach(test=>{

    const acc =
    Number(test.accuracy.replace("%",""));

    const wpm =
    Number(test.wpm);

    if(acc > highestAccuracy){

        highestAccuracy = acc;

    }

    totalAccuracy += acc;
    totalWPM += wpm;

    // Approximation: 1 WPM ≈ 5 chars/min × test duration (15 sec default)
    charactersTyped += wpm * 5;

});

const avgAccuracy =
history.length
? Math.round(totalAccuracy/history.length)
: 0;

const avgWPM =
history.length
? Math.round(totalWPM/history.length)
: 0;

// Simple Level System
const level =
Math.max(1,Math.floor(xp/100)+1);

// Approximate Practice Time
const practiceMinutes =
history.length * 0.25;

// ======================================
// UI
// ======================================

bestWPMEl.textContent = bestWPM;

bestAccuracyEl.textContent =
highestAccuracy + "%";

totalTestsEl.textContent =
history.length;

totalXPEl.textContent =
xp + " XP";

currentLevelEl.textContent =
level;

charactersTypedEl.textContent =
charactersTyped.toLocaleString();

averageWPMEl.textContent =
avgWPM;

averageAccuracyEl.textContent =
avgAccuracy + "%";

practiceTimeEl.textContent =
practiceMinutes.toFixed(1) + " min";

// ======================================
// WEEKLY (currently based on all history)
// ======================================

weeklyTestsEl.textContent =
history.length;

weeklyWPMEl.textContent =
avgWPM;

weeklyAccuracyEl.textContent =
avgAccuracy + "%";

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("typingAthleteUser");

    window.location.href = "login.html";

});