/* ================= AUTH GUARD ================= */
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

/* ================= LOGOUT ================= */
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

/* ================= FORM ELEMENTS ================= */
const form = document.getElementById("feedbackForm");
const experience = document.getElementById("experience");
const feedback = document.getElementById("feedback");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const emailLi = document.getElementById("emailLi");
const feedbackSubmitBtn = document.getElementById("feedbackSubmitBtn");

/* ================= SHOW USER EMAIL ================= */
const currentUser = JSON.parse(localStorage.getItem("user"));
if (currentUser && currentUser.email) {
    emailLi.style.display = "block";
    emailLi.textContent = currentUser.email;
}

/* ================= LIVE VALIDATION ================= */
experience.addEventListener("blur", () => { ValidateExperience(); updateSubmitButtonState(); });
experience.addEventListener("input", () => { ValidateExperience(); updateSubmitButtonState(); });

feedback.addEventListener("blur", () => { ValidateFeedback(); updateSubmitButtonState(); });
feedback.addEventListener("input", () => { ValidateFeedback(); updateSubmitButtonState(); });

ratingInputs.forEach(radio => {
    radio.addEventListener("change", () => { ValidateRating(); updateSubmitButtonState(); });
});

/* ================= VALIDATORS ================= */
function ValidateExperience() {
    if (experience.value === "") {
        showError(experience, "experienceError", "Please select your experience");
        return false;
    } else {
        clearError(experience, "experienceError");
        return true;
    }
}

function ValidateFeedback() {
    if (feedback.value.trim() === "") {
        showError(feedback, "feedbackError", "Feedback is required");
        return false;
    } else if (feedback.value.trim().length < 10) {
        showError(feedback, "feedbackError", "Feedback must be at least 10 characters");
        return false;
    } else {
        clearError(feedback, "feedbackError");
        return true;
    }
}

function ValidateRating() {
    const ratingChecked = document.querySelector('input[name="rating"]:checked');
    if (ratingChecked) {
        clearError(null, "ratingError");
        return true;
    } else {
        showError(null, "ratingError", "Please select a rating");
        return false;
    }
}

/* ================= ENABLE/DISABLE SUBMIT BUTTON ================= */
function updateSubmitButtonState() {
    const isValid = ValidateExperience() && ValidateFeedback() && ValidateRating();
    feedbackSubmitBtn.disabled = !isValid;
}

/* ================= SUBMIT ================= */
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    clearErrors();

    // Defensive validation
    const valid = ValidateExperience() && ValidateFeedback() && ValidateRating();
    if (!valid) return;

    feedbackSubmitBtn.disabled = true; // prevent double click
    document.getElementById("loader").style.display = "flex";

    const ratingChecked = document.querySelector('input[name="rating"]:checked');

    const payload = {
        type: "feedback",
        email: currentUser.email,
        rating: ratingChecked ? ratingChecked.value : "",
        experience: experience.value,
        feedback: feedback.value.trim()
    };

    try {
        const response = await fetch(CONFIG.SHEETS_API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.result === "success") {
            alert("Feedback submitted successfully 🎉");
            form.reset();
            feedbackSubmitBtn.disabled = true; // disable again until valid
        } else {
            alert("Something went wrong. Try again.");
            updateSubmitButtonState();
        }

    } catch (err) {
        alert("Network error. Please try later.");
        console.error(err);
        updateSubmitButtonState();
    } finally {
        document.getElementById("loader").style.display = "none";
    }
});

/* ================= HELPERS ================= */
function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;

    if (input) {
        input.classList.add("error-border");
    } else if (errorId === "ratingError") {
        document.querySelector(".star-rating").classList.add("error-border");
    }

    return false;
}

function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";

    if (input) {
        input.classList.remove("error-border");
    } else if (errorId === "ratingError") {
        document.querySelector(".star-rating").classList.remove("error-border");
    }

    return true;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
}
