// ============================
// Dashboard V1
// ============================

// User Name
const userName =
localStorage.getItem("typingAthleteUser") || "Guest";

document.getElementById("user-name").textContent = userName;

// Best WPM
const bestWPM =
Number(localStorage.getItem("bestWPM") || 0);

document.getElementById("best-wpm").textContent = bestWPM;

// History
const history =
JSON.parse(localStorage.getItem("typingHistory")) || [];

// Total Tests
document.getElementById("total-tests").textContent =
history.length;

// Average Accuracy
let totalAccuracy = 0;

history.forEach(test=>{

    totalAccuracy +=
    parseInt(test.accuracy);

});

const avgAccuracy =
history.length
? Math.round(totalAccuracy / history.length)
: 100;

document.getElementById("avg-accuracy").textContent =
avgAccuracy + "%";

// Total Characters
const totalCharacters =
Number(localStorage.getItem("totalCharactersTyped") || 0);

document.getElementById("total-characters").textContent =
totalCharacters.toLocaleString();

// Level System
let level = "Beginner 🟢";

if(bestWPM >= 80){

    level = "Typing Athlete 🔥";

}
else if(bestWPM >= 60){

    level = "Expert 🟠";

}
else if(bestWPM >= 40){

    level = "Advanced 🟣";

}
else if(bestWPM >= 20){

    level = "Intermediate 🔵";

}

document.getElementById("level").textContent = level;

// XP

const xp = Number(localStorage.getItem("userXP") || 0);

document.getElementById("user-xp").textContent = xp + " XP";