import { showError, clearError } from "../utils/utility.js"
import { CONFIG } from "../utils/config.js" // Declare CONFIG variable

/* ================= AUTH GUARD ================= */
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html"
}

/* ================= LOGOUT ================= */
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("user")
  window.location.href = "login.html"
})

/* ================= FORM ELEMENTS ================= */
const form = document.getElementById("feedbackForm")
const experience = document.getElementById("experience")
const feedback = document.getElementById("feedback")
const ratingInputs = document.querySelectorAll('input[name="rating"]')
const emailLi = document.getElementById("emailLi")
const feedbackSubmitBtn = document.getElementById("feedbackSubmitBtn")
const logoutLi = document.getElementById("logoutLi")

/* ================= SHOW USER EMAIL ================= */
const currentUser = JSON.parse(localStorage.getItem("user"))

if (currentUser && currentUser.email) {
  if (emailLi) {
    emailLi.style.display = "block"
    emailLi.textContent = currentUser.email
  }
  if (logoutLi) {
    logoutLi.style.display = "block"
  }
} else {
  // Redirect if not logged in
  window.location.href = "login.html"
}

/* ================= LIVE VALIDATION ================= */
experience.addEventListener("blur", () => {
  ValidateExperience()
  updateSubmitButtonState()
})
experience.addEventListener("input", () => {
  ValidateExperience()
  updateSubmitButtonState()
})

feedback.addEventListener("blur", () => {
  ValidateFeedback()
  updateSubmitButtonState()
})
feedback.addEventListener("input", () => {
  ValidateFeedback()
  updateSubmitButtonState()
})

ratingInputs.forEach((radio) => {
  radio.addEventListener("change", () => {
    ValidateRating()
    updateSubmitButtonState()
  })
})

/* ================= VALIDATORS ================= */
function ValidateExperience() {
  if (experience.value === "") {
    showError(experience, "experienceError", "Please select your experience")
    return false
  } else {
    clearError(experience, "experienceError")
    return true
  }
}

function ValidateFeedback() {
  if (feedback.value.trim() === "") {
    showError(feedback, "feedbackError", "Message is required")
    return false
  } else if (feedback.value.trim().length < 10) {
    showError(feedback, "feedbackError", "Message must be at least 10 characters")
    return false
  } else {
    clearError(feedback, "feedbackError")
    return true
  }
}

function ValidateRating() {
  const ratingChecked = document.querySelector('input[name="rating"]:checked')
  if (ratingChecked) {
    clearError(null, "ratingError")
    return true
  } else {
    showError(null, "ratingError", "Please select a rating")
    return false
  }
}

/* ================= ENABLE/DISABLE SUBMIT BUTTON ================= */
function updateSubmitButtonState() {
  const isValid = ValidateExperience() && ValidateFeedback() && ValidateRating()
  feedbackSubmitBtn.disabled = !isValid
}

/* ================= SUBMIT ================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  clearErrors()

  const valid = ValidateExperience() && ValidateFeedback() && ValidateRating()
  if (!valid) return

  feedbackSubmitBtn.disabled = true
  document.getElementById("loader").style.display = "flex"

  const contactContainer = document.querySelector(".contact-container")
  contactContainer.classList.add("dimmed")

  const ratingChecked = document.querySelector('input[name="rating"]:checked')

  const payload = {
    type: "contact",
    email: currentUser.email,
    rating: ratingChecked ? ratingChecked.value : "",
    experience: experience.value,
    feedback: feedback.value.trim(),
  }

  try {
    const response = await fetch(CONFIG.SHEETS_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (result.result === "success") {
      alert("Message sent successfully 🎉")
      form.reset()
      feedbackSubmitBtn.disabled = true
    } else {
      alert("Something went wrong. Try again.")
      updateSubmitButtonState()
    }
  } catch (err) {
    alert("Network error. Please try later.")
    console.error(err)
    updateSubmitButtonState()
  } finally {
    contactContainer.classList.remove("dimmed")
    document.getElementById("loader").style.display = "none"
  }
})

/* ================= HELPERS ================= */
function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""))
}
