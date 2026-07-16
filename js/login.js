// ==========================
// Typing Athlete Login V1
// ==========================

const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("login-btn");

// Agar user pehle se login hai
const savedUser = localStorage.getItem("typingAthleteUser");

if(savedUser){

    window.location.href = "practice.html";

}

// Login Button
loginBtn.addEventListener("click",()=>{

    const username = usernameInput.value.trim();

    if(username === ""){

        alert("Please enter your name.");

        return;

    }

    // Save user
    localStorage.setItem("typingAthleteUser", username);

    // Go to Practice Page
    window.location.href = "practice.html";

});

// Enter key support
usernameInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        loginBtn.click();

    }

});