document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementsByClassName("nav-links")[0];

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});
