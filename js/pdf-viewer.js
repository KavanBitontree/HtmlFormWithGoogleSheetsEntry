// Import PDF.js library
const pdfjsLib = window["pdfjs-dist/build/pdf"]

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

document.addEventListener("DOMContentLoaded", () => {
  const canvases = document.querySelectorAll(".pdf-thumb-canvas")

  canvases.forEach((canvas) => {
    const pdfPath = canvas.getAttribute("data-pdf")
    generatePdfThumbnail(pdfPath, canvas)
  })
})

async function generatePdfThumbnail(pdfPath, canvas) {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfPath)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1) // Get first page

    const viewport = page.getViewport({ scale: 1.5 })
    const context = canvas.getContext("2d")

    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    }

    await page.render(renderContext).promise
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error)
    const context = canvas.getContext("2d")
    canvas.width = 300
    canvas.height = 200
    context.fillStyle = "#f0f0f0"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "#666"
    context.font = "16px Arial"
    context.textAlign = "center"
    context.fillText("PDF Preview", canvas.width / 2, canvas.height / 2 - 10)
    context.fillText("Unavailable", canvas.width / 2, canvas.height / 2 + 10)
  }
}

function openPdfModal(pdfPath) {
  const modal = document.getElementById("pdfModal")
  const pdfFrame = document.getElementById("pdfFrame")

  pdfFrame.src = pdfPath
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closePdfModal() {
  const modal = document.getElementById("pdfModal")
  const pdfFrame = document.getElementById("pdfFrame")

  modal.style.display = "none"
  pdfFrame.src = ""
  document.body.style.overflow = "auto"
}

window.onclick = (event) => {
  const modal = document.getElementById("pdfModal")
  if (event.target === modal) {
    closePdfModal()
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.getElementById("pdfModal")
    if (modal.style.display === "block") {
      closePdfModal()
    }
  }
})
