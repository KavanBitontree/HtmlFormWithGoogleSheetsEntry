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
const logoutLi = document.getElementById("logoutLi")

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

/* ================= EXPERIENCE DATA ================= */
const experiences = [
  {
    id: "bitontree",
    company: "Bitontree Solutions",
    position: "AI/ML Intern",
    location: "Vadodara, Gujarat",
    duration: "Dec 2024 - Present",
    type: "INTERNSHIP",
    certificate: "/certificates/bitontree-internship.pdf",
  },
  {
    id: "techorses",
    company: "Techorses",
    position: "Backend Developer",
    location: "Vadodara, Gujarat (Remote)",
    duration: "Apr 2025 - May 2025",
    type: "FREELANCE",
    responsibilities: [
      "Built and deployed secured applications using Python Flask with MySQL databases",
      "Integrated Razorpay for secure payment processing and Delhivery API for logistics",
      "Deployed Flask applications on Apache2 server with production-ready configurations",
      "Implemented Google OAuth for secure user authentication and authorization",
      "Developed URL parsing functionality for Open Graph/meta tags to generate dynamic link previews",
      "Optimized database queries and API response times for better performance",
    ],
    technologies: ["Python", "Flask", "MySQL", "Apache2", "Razorpay API", "Delhivery API", "Google OAuth"],
    achievements: [
      "Successfully deployed multiple production applications",
      "Improved API response times by implementing efficient caching strategies",
      "Integrated multiple third-party services seamlessly",
    ],
    liveUrl: "https://mtm-store.com/",
    githubUrl: "https://github.com/kavangajera/flask-backend",
  },
]

/* ================= UPDATE UI WITH EXPERIENCE DATA ================= */
document.addEventListener("DOMContentLoaded", () => {
  experiences.forEach((exp) => {
    const expElement = document.querySelector(`[data-experience-id="${exp.id}"]`)
    if (expElement) {
      const typeElement = expElement.querySelector(".experience-type")
      if (typeElement) {
        typeElement.textContent = `[${exp.type}]`
      }
    }
  })

  // Update techorses experience links
  const techorses = experiences.find((exp) => exp.id === "techorses")
  if (techorses) {
    document.getElementById("liveUrlBtn").href = techorses.liveUrl
    document.getElementById("githubUrlBtn").href = techorses.githubUrl
  }

  initPDFThumbnails()
})

/* Added PDF.js thumbnail generation */
function initPDFThumbnails() {
  const pdfjsLib = window["pdfjs-dist/build/pdf"]
  if (typeof pdfjsLib === "undefined") {
    console.error("PDF.js library not loaded")
    return
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

  const thumbnails = document.querySelectorAll(".pdf-thumbnail")

  thumbnails.forEach((canvas) => {
    const pdfUrl = canvas.getAttribute("data-pdf")
    if (!pdfUrl) return

    const loadingTask = pdfjsLib.getDocument(pdfUrl)

    loadingTask.promise
      .then((pdf) => {
        pdf.getPage(1).then((page) => {
          const scale = 1.5
          const viewport = page.getViewport({ scale })

          canvas.width = viewport.width
          canvas.height = viewport.height

          const context = canvas.getContext("2d")
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }

          page.render(renderContext)
        })
      })
      .catch((error) => {
        console.error("Error loading PDF:", error)
        const context = canvas.getContext("2d")
        context.fillStyle = "#f0f0f0"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = "#666"
        context.font = "16px Arial"
        context.textAlign = "center"
        context.fillText("PDF Preview Unavailable", canvas.width / 2, canvas.height / 2)
      })
  })
}

/* Added PDF modal functions */
function openPDFModal(pdfUrl) {
  const modal = document.getElementById("pdfModal")
  const iframe = document.getElementById("pdfModalIframe")
  iframe.src = pdfUrl
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closePDFModal() {
  const modal = document.getElementById("pdfModal")
  const iframe = document.getElementById("pdfModalIframe")
  modal.style.display = "none"
  iframe.src = ""
  document.body.style.overflow = "auto"
}

// Close modal on outside click
window.addEventListener("click", (event) => {
  const modal = document.getElementById("pdfModal")
  if (event.target === modal) {
    closePDFModal()
  }
})

// Close modal on Escape key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePDFModal()
  }
})

/* ================= BUTTON HOVER EFFECTS ================= */
document.querySelectorAll(".experience-link-btn, .attachment-btn").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})
