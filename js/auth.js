// ============================
// Authentication
// ============================

const welcomeUser = document.getElementById("welcome-user");
const logoutBtn = document.getElementById("logout-btn");

const currentUser = localStorage.getItem("typingAthleteUser");

// Agar practice page par hai
if (welcomeUser) {

    if (!currentUser) {

        window.location.href = "login.html";

    } else {

        welcomeUser.textContent = `Welcome, ${currentUser} 👋`;

    }

}

// Logout
if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("typingAthleteUser");

        window.location.href = "login.html";

    });

}