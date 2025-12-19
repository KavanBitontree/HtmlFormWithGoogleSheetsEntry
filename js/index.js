;(() => {
  // Theme switching functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference or respect OS preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
  } else if (currentTheme === "light") {
    body.classList.remove("dark-mode");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-mode");
  }

  // Toggle theme function
  function toggleTheme() {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");

    // Update SVG icon based on theme
    updateThemeIcon(isDarkMode);

    // Save user preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }

  // Update the theme toggle icon based on current theme
  function updateThemeIcon(isDarkMode) {
    if (themeToggle) {
      const svgPath = themeToggle.querySelector("svg path");
      if (svgPath) {
        if (isDarkMode) {
          // Moon icon for dark mode
          svgPath.setAttribute("d", "M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z");
        } else {
          // Sun icon for light mode
          svgPath.setAttribute("d", "M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z");
        }
      }
    }
  }

  // Initialize theme icon based on current theme
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    // Set initial icon based on current theme
    updateThemeIcon(body.classList.contains("dark-mode"));
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("navLinks")

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Handle scroll visibility
  function handleScrollVisibility() {
    const body = document.body
    const html = document.documentElement
    const windowHeight = window.innerHeight
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )

    if (documentHeight <= windowHeight) {
      body.style.overflow = "hidden"
    } else {
      body.style.overflow = "auto"
    }
  }

  handleScrollVisibility()
  window.addEventListener("resize", handleScrollVisibility)

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
