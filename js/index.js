if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html"
}

  /* ================= LOGOUT ================= */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }

  /* ================= SHOW USER EMAIL ================= */
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const emailLi = document.getElementById("emailLi");
  const logoutLi = document.getElementById("logoutLi");

  if (currentUser && currentUser.email) {
    if (emailLi) {
      emailLi.style.display = "block";
      emailLi.textContent = currentUser.email;
    }
    if (logoutLi) {
      logoutLi.style.display = "block";
    }
  }

;(() => {
  // Hamburger menu toggle is handled by navbar.js
  // Scroll visibility is handled by scroll-handler.js
  // This ensures consistent behavior across all pages

  // ================= SKILL TAG PROGRESS BAR ANIMATION =================
  const skillTags = document.querySelectorAll(".skill-tag")

  skillTags.forEach((tag) => {
    const skillValue = Number.parseInt(tag.getAttribute("data-skill"))
    const progressBar = tag.querySelector(".skill-progress-bar")
    const percentageText = tag.querySelector(".skill-percentage")
    let animationFrame = null

    if (progressBar && percentageText && skillValue) {
      tag.addEventListener("mouseenter", () => {
        // Animate progress bar width
        progressBar.style.width = `${skillValue}%`

        // Animate percentage count from 0 to target value
        let currentValue = 0
        const duration = 1500 // 1.5 seconds
        const startTime = performance.now()

        const animateCount = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // Use easing function for smooth counting
          const easedProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress

          currentValue = Math.floor(easedProgress * skillValue)
          percentageText.textContent = `${currentValue}%`

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animateCount)
          } else {
            percentageText.textContent = `${skillValue}%`
          }
        }

        animationFrame = requestAnimationFrame(animateCount)
      })

      tag.addEventListener("mouseleave", () => {
        // Cancel animation if still running
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }

        // Reset progress bar and text
        progressBar.style.width = "0%"
        percentageText.textContent = "0%"
      })
    }
  })

  // ================= LOGO CONTAINER PROGRESS BAR ANIMATION =================
  const logoContainers = document.querySelectorAll(".logo-container")

  logoContainers.forEach((container) => {
    const skillValue = Number.parseInt(container.getAttribute("data-skill"))
    const progressBar = container.querySelector(".logo-progress-bar")
    const percentageText = container.querySelector(".logo-percentage")
    let animationFrame = null

    if (progressBar && percentageText && skillValue) {
      // Store the original text label (e.g., "Apple - ")
      const originalText = percentageText.textContent.split("-")[0].trim()

      container.addEventListener("mouseenter", () => {
        // Animate progress bar width
        progressBar.style.width = `${skillValue}%`

        // Animate percentage count from 0 to target value
        let currentValue = 0
        const duration = 1500 // 1.5 seconds
        const startTime = performance.now()

        const animateCount = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // Use easing function for smooth counting
          const easedProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress

          currentValue = Math.floor(easedProgress * skillValue)
          percentageText.textContent = `${originalText} - ${currentValue}%`

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animateCount)
          } else {
            percentageText.textContent = `${originalText} - ${skillValue}%`
          }
        }

        animationFrame = requestAnimationFrame(animateCount)
      })

      container.addEventListener("mouseleave", () => {
        // Cancel animation if still running
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }

        // Reset progress bar and text
        progressBar.style.width = "0%"
        percentageText.textContent = `${originalText} - 0%`
      })
    }
  })

  // ================= INTERACTIVE NEURAL NETWORK AND LOGOS =================
  const portfolioRight = document.querySelector(".portfolio-right")
  const neuralNetwork = document.querySelector(".neural-network")
  const mlLogos = document.querySelectorAll(".ml-logo")
  const circuitLines = document.querySelector(".circuit-lines")

  if (portfolioRight && neuralNetwork) {
    portfolioRight.addEventListener("mousemove", (e) => {
      const rect = portfolioRight.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      // Interactive neural network following cursor
      neuralNetwork.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(0, 188, 212, 0.4) 0%, transparent 50%),
        radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(255, 255, 255, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(0, 188, 212, 0.15) 0%, transparent 60%)
      `

      // Make logos react to cursor proximity
      mlLogos.forEach((logo) => {
        const logoRect = logo.getBoundingClientRect()
        const logoCenterX = logoRect.left + logoRect.width / 2
        const logoCenterY = logoRect.top + logoRect.height / 2
        const distance = Math.hypot(e.clientX - logoCenterX, e.clientY - logoCenterY)

        // If cursor is close to logo (within 150px), enhance the glow
        if (distance < 150) {
          const intensity = 1 - distance / 150
          logo.style.filter = `drop-shadow(0 0 ${15 + intensity * 20}px rgba(0, 188, 212, ${
            0.5 + intensity * 0.5
          })) brightness(${1.2 + intensity * 0.3})`
          logo.style.transform = `scale(${1 + intensity * 0.15})`
        } else {
          logo.style.filter = ""
          logo.style.transform = ""
        }
      })

      // Circuit lines react to cursor
      if (circuitLines) {
        const rotateX = ((y - 50) / 50) * 5
        const rotateY = ((x - 50) / 50) * -5
        circuitLines.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    })

    portfolioRight.addEventListener("mouseleave", () => {
      // Reset neural network to default animation
      neuralNetwork.style.background = ""

      // Reset all logos
      mlLogos.forEach((logo) => {
        logo.style.filter = ""
        logo.style.transform = ""
      })

      // Reset circuit lines
      if (circuitLines) {
        circuitLines.style.transform = ""
      }
    })
  }

  // ================= GENERATE AI/ML PARTICLES =================
  const particleContainer = document.getElementById("particles")

  if (particleContainer) {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animationDuration = `${4 + Math.random() * 4}s`
      particle.style.width = `${4 + Math.random() * 6}px`
      particle.style.height = particle.style.width
      particleContainer.appendChild(particle)
    }
  }
})()
