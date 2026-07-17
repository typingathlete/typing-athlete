// ======================================
// ELEMENTS
// ======================================

const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

const progressFill = document.getElementById("achievement-progress");
const completedAchievements = document.getElementById("completed-achievements");
const totalAchievements = document.getElementById("total-achievements");

const cards = document.querySelectorAll(".achievement-card");

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

const history =
JSON.parse(localStorage.getItem("typingHistory")) || [];

const xp =
Number(localStorage.getItem("userXP") || 0);

// Highest Accuracy

let highestAccuracy = 0;

history.forEach(test=>{

    const acc =
    Number(test.accuracy.replace("%",""));

    if(acc > highestAccuracy){

        highestAccuracy = acc;

    }

});

// ======================================
// ACHIEVEMENTS
// ======================================

let unlocked = 0;

cards.forEach(card=>{

    const title =
    card.querySelector("h2").innerText;

    let isUnlocked = false;

    switch(title){

        case "First Test":
            isUnlocked = history.length >= 1;
            break;

        case "30 WPM":
            isUnlocked = bestWPM >= 30;
            break;

        case "50 WPM":
            isUnlocked = bestWPM >= 50;
            break;

        case "80 WPM":
            isUnlocked = bestWPM >= 80;
            break;

        case "100 WPM Master":
            isUnlocked = bestWPM >= 100;
            break;

        case "Accuracy Master":
            isUnlocked = highestAccuracy >= 95;
            break;

        case "7 Day Streak":
            isUnlocked = xp >= 500;
            break;

        case "100 Tests":
            isUnlocked = history.length >= 100;
            break;

    }

    if(isUnlocked){

        card.classList.remove("locked");

        card.classList.add("unlocked");

        unlocked++;

    }else{

        card.classList.remove("unlocked");

        card.classList.add("locked");

    }

});

// ======================================
// PROGRESS BAR
// ======================================

completedAchievements.textContent = unlocked;

totalAchievements.textContent = cards.length;

const percent =
(unlocked/cards.length)*100;

progressFill.style.width =
percent + "%";

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("typingAthleteUser");

    window.location.href = "login.html";

});