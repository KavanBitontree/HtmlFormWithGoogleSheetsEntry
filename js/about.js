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

/* ================= SHOW USER EMAIL ================= */
const currentUser = JSON.parse(localStorage.getItem("user"))
const emailLi = document.getElementById("emailLi")
if (currentUser && currentUser.email) {
  emailLi.style.display = "block"
  emailLi.textContent = currentUser.email
}