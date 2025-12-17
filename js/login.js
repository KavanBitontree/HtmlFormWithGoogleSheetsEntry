/* ================= CHECK IF LOGGED IN USER COMES IN LOGIN REDIRECT TO WELCOME ================= */

(function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn === "true" && user) {
        window.location.href = "index.html";
    }
})();
/* ================= ELEMENTS ================= */
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/* ================= LIVE + BLUR VALIDATION ================= */
emailInput.addEventListener("input", validateEmail);
emailInput.addEventListener("blur", validateEmail);

passwordInput.addEventListener("input", validatePassword);
passwordInput.addEventListener("blur", validatePassword);

/* ================= SUBMIT ================= */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const valid =
        validateEmail() &
        validatePassword();

    if (!valid) return;

    const storedUser = localStorage.getItem("registeredUser");
    if (!storedUser) {
        showError(emailInput, "emailError", "No user found. Please register first.");
        return;
    }

    const user = JSON.parse(storedUser);

    if (emailInput.value.trim() !== user.email) {
        showError(emailInput, "emailError", "Email not registered");
        return;
    }

    if (passwordInput.value !== user.password) {
        showError(passwordInput, "passwordError", "Incorrect password");
        return;
    }

    /* ✅ LOGIN SESSION */
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({ email: user.email }));

    alert("Login successful 🎉");
    window.location.href = "index.html";
});

/* ================= VALIDATORS ================= */
function validateEmail() {
    const value = emailInput.value.trim();

    if (value === "")
        return showError(emailInput, "emailError", "Email is required");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return showError(emailInput, "emailError", "Invalid email format");

    const blocked = /(gmail|yahoo|outlook|hotmail)\.com$/i;
    if (blocked.test(value)){
        return showError(emailInput, "emailError", "Use business email only");
    }

    return clearError(emailInput, "emailError");
}

function validatePassword() {
    const value = passwordInput.value;

    if (value === "")
        return showError(passwordInput, "passwordError", "Password is required");

    if (value.length < 6)
        return showError(passwordInput, "passwordError", "Minimum 6 characters");

    return clearError(passwordInput, "passwordError");
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