// ======================================
// USER
// ======================================

const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

// Login User
const user =
localStorage.getItem("typingAthleteUser");

if (user && welcomeUser) {

    welcomeUser.textContent =
    "Welcome, " + user + " 👋";

}

// Logout

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("typingAthleteUser");

        window.location.href = "login.html";

    });

}

// ======================================
// YOUR STATS
// ======================================

const best =
Number(localStorage.getItem("bestWPM") || 0);

const tests =
JSON.parse(localStorage.getItem("typingHistory")) || [];

let bestAccuracy = 0;

tests.forEach(test => {

    const acc =
    Number(test.accuracy.replace("%",""));

    if(acc > bestAccuracy){

        bestAccuracy = acc;

    }

});

document.getElementById("your-best-wpm").textContent = best;

document.getElementById("your-accuracy").textContent =
bestAccuracy + "%";

document.getElementById("your-tests").textContent =
tests.length;

// ======================================
// SEARCH
// ======================================

const search =
document.getElementById("search-player");

search.addEventListener("keyup",()=>{

    const value =
    search.value.toLowerCase();

    const rows =
    document.querySelectorAll("#leaderboard-body tr");

    rows.forEach(row=>{

        const text =
        row.innerText.toLowerCase();

        if(text.includes(value)){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

});

// ======================================
// FILTER BUTTONS
// ======================================

const filters =
document.querySelectorAll(".filter");

filters.forEach(button=>{

    button.addEventListener("click",()=>{

        filters.forEach(btn=>
        btn.classList.remove("active"));

        button.classList.add("active");

    });

});

// ======================================
// DEMO RANK
// ======================================

const rank =
document.getElementById("your-rank");

if(best >= 90){

    rank.textContent = "#1";

}else if(best >= 80){

    rank.textContent = "#2";

}else if(best >= 70){

    rank.textContent = "#3";

}else if(best >= 60){

    rank.textContent = "#4";

}else{

    rank.textContent = "#10";

}