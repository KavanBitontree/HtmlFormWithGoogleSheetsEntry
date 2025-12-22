const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks") || document.querySelector(".nav-links")
const themeToggle = document.getElementById("themeToggle")
const sunIcon = document.getElementById("sunIcon")
const moonIcon = document.getElementById("moonIcon")

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
let currentTheme = localStorage.getItem("theme");

// Initialize theme on page load
function initTheme() {
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    if (sunIcon && moonIcon) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    if (sunIcon && moonIcon) {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }
}

// Initialize theme immediately
initTheme();

// Toggle theme function
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  if (isDarkMode) {
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  if (isDarkMode) {
    if (sunIcon && moonIcon) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
    localStorage.setItem("theme", "dark");
  } else {
    if (sunIcon && moonIcon) {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
    localStorage.setItem("theme", "light");
  }
}

// Add event listener to theme toggle button
if (themeToggle) {
  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  });
}

// Listen for OS theme preference changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    if (e.matches) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      if (sunIcon && moonIcon) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      if (sunIcon && moonIcon) {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      }
    }
  }
});

// Hamburger menu toggle
if (hamburger && navLinks) {
  // Function to toggle body scroll
  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  };

  // Use touchstart for better mobile responsiveness
  const handleHamburgerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = hamburger.classList.contains("active");
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    
    // Disable body scroll when menu opens
    toggleBodyScroll(!isActive);
  };

  hamburger.addEventListener("click", handleHamburgerClick);
  hamburger.addEventListener("touchstart", handleHamburgerClick, { passive: false });

  // Close menu when clicking outside or on overlay
  const handleOutsideClick = (e) => {
    if (navLinks.classList.contains("active")) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        toggleBodyScroll(false);
      }
    }
  };

  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("touchend", handleOutsideClick);

  // Close menu when clicking on nav links
  const navLinkItems = navLinks.querySelectorAll("a");
  navLinkItems.forEach(link => {
    const closeMenu = () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      toggleBodyScroll(false);
    };
    link.addEventListener("click", closeMenu);
    link.addEventListener("touchend", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      toggleBodyScroll(false);
    }
  });
}