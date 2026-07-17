// ======================================
// ELEMENTS
// ======================================

const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

const profileName = document.getElementById("profile-name");
const infoName = document.getElementById("info-name");

const bestWPM = document.getElementById("best-wpm");
const bestAccuracy = document.getElementById("best-accuracy");
const totalTests = document.getElementById("total-tests");
const charactersTyped = document.getElementById("characters-typed");

const userXP = document.getElementById("user-xp");
const userLevel = document.getElementById("user-level");

const editProfile = document.getElementById("edit-profile");

// ======================================
// USER
// ======================================

const user =
localStorage.getItem("typingAthleteUser") || "Guest";

welcomeUser.textContent = "Welcome, " + user + " 👋";

profileName.textContent = user;

infoName.textContent = user;

// ======================================
// LOAD HISTORY
// ======================================

const history =
JSON.parse(localStorage.getItem("typingHistory")) || [];

const best =
Number(localStorage.getItem("bestWPM") || 0);

bestWPM.textContent = best;

totalTests.textContent = history.length;

// ======================================
// BEST ACCURACY
// ======================================

let highestAccuracy = 0;

let totalCharacters = 0;

history.forEach(test=>{

    const acc =
    Number(test.accuracy.replace("%",""));

    if(acc > highestAccuracy){

        highestAccuracy = acc;

    }

    totalCharacters += test.wpm * 5;

});

bestAccuracy.textContent =
highestAccuracy + "%";

charactersTyped.textContent =
totalCharacters.toLocaleString();

// ======================================
// XP & LEVEL
// ======================================

let xp =
Number(localStorage.getItem("userXP") || 0);

userXP.textContent =
xp + " XP";

const level =
Math.floor(xp / 100) + 1;

userLevel.textContent =
level;

// ======================================
// RANK NAME
// ======================================

const rank =
document.getElementById("user-rank");

if(level >= 20){

    rank.textContent = "Legend";

}else if(level >= 15){

    rank.textContent = "Master";

}else if(level >= 10){

    rank.textContent = "Pro";

}else if(level >= 5){

    rank.textContent = "Intermediate";

}else{

    rank.textContent = "Beginner";

}

// ======================================
// JOIN DATE
// ======================================

const joinDate =
document.getElementById("join-date");

let savedDate =
localStorage.getItem("joinDate");

if(!savedDate){

    savedDate =
    new Date().toLocaleDateString();

    localStorage.setItem(
        "joinDate",
        savedDate
    );

}

joinDate.textContent = savedDate;

// ======================================
// EDIT PROFILE
// ======================================

editProfile.addEventListener("click",()=>{

    alert(
        "Edit Profile feature will be added soon 🚀"
    );

});

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem(
        "typingAthleteUser"
    );

    window.location.href =
    "login.html";

});