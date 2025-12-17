/* ================= CHECK IF LOGGED IN USER COMES IN REGISTER REDIRECT TO WELCOME ================= */

(function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn === "true" && user) {
        window.location.href = "index.html";
    }
})();

/* ================= PASSWORD TOGGLE ================= */
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === "password" ? "text" : "password";
}

/* ================= ELEMENTS ================= */
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

/* ================= LIVE VALIDATION ================= */
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

/* ================= SUBMIT ================= */
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const valid =
        validateName() &
        validateEmail() &
        validatePassword() &
        validateConfirmPassword();

        if (!valid) return;
        //load screen

        document.getElementById("loader").style.display = "flex";

        // Create payload
        const payload = {
            type: "register",
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        try {
        const response = await fetch(CONFIG.SHEETS_API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.result === "register_success") {
            alert("Registration done successfully 🎉");
               // Store in localStorage (session-like)
            localStorage.setItem("registeredUser", JSON.stringify(payload));
            form.reset();

            // Redirect to login page
            window.location.href = "login.html";
            
        } else {
            alert("Something went wrong. Try again.");
        }

    } catch (err) {
        alert("Network error. Please try later.");
        console.error(err);
    } finally {
        document.getElementById("loader").style.display = "none";
    }
    
});

/* ================= VALIDATORS ================= */
function validateName() {
    const value = nameInput.value.trim();
    if (value === "") return showError(nameInput, "nameError", "Full name is required");
    if (!/^[A-Z]/.test(value)) return showError(nameInput, "nameError", "First letter must be capital");
    return clearError(nameInput, "nameError");
}

function validateEmail() {
    const value = emailInput.value.trim();
    const blocked = /(gmail|yahoo|outlook|hotmail)\.com$/i;
    const storedUser = localStorage.getItem("registeredUser");

    if (value === "") return showError(emailInput, "emailError", "Email is required");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return showError(emailInput, "emailError", "Invalid email format");

    if (blocked.test(value)) return showError(emailInput, "emailError", "Use business email only");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (value === user.email) {
            return showError(emailInput, "emailError", "This email is already registered");
        }
    }

    return clearError(emailInput, "emailError");
}


function validatePassword() {
    const value = passwordInput.value;
    if (value === "") return showError(passwordInput, "passwordError", "Password is required");
    if (value.length < 6) return showError(passwordInput, "passwordError", "Minimum 6 characters");
    return clearError(passwordInput, "passwordError");
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value === "")
        return showError(confirmPasswordInput, "confirmPasswordError", "Confirm password is required");
    if (confirmPasswordInput.value !== passwordInput.value)
        return showError(confirmPasswordInput, "confirmPasswordError", "Passwords do not match");
    return clearError(confirmPasswordInput, "confirmPasswordError");
}

/* ================= HELPERS ================= */
function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.classList.add("error-border");
    return false;
}

function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("error-border");
    return true;
}