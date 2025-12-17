(function() {
  // Redirect if not logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));
  if (!isLoggedIn || isLoggedIn !== "true" || !user) {
    window.location.href = "login.html";
    return;
  }

  // Navbar elements
  const loginLi = document.getElementById("loginLi");
  const registerLi = document.getElementById("registerLi");
  const logoutLi = document.getElementById("logoutLi");
  const emailLi = document.getElementById("emailLi");

  // Show user email and logout
  loginLi.style.display = "none";
  registerLi.style.display = "none";
  logoutLi.style.display = "block";
  emailLi.style.display = "block";
  emailLi.textContent = user.email;

  // Logout event
  document.getElementById("logoutBtn").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
})();