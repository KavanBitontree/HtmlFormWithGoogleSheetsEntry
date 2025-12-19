// Neural Network Background Animation for About Page

const canvas = document.getElementById("neuralCanvas")
const ctx = canvas.getContext("2d")

const aboutContainer = document.querySelector(".about-container")
let width, height

function updateCanvasSize() {
  const rect = aboutContainer.getBoundingClientRect()
  width = canvas.width = rect.width
  height = canvas.height = rect.height
}

// Initial size update
updateCanvasSize()

// Nodes for neural network
const nodes = []
const nodeCount = 150
const maxDistance = 300

// Mouse position
const mouse = { x: null, y: null }

// Resize handler
window.addEventListener("resize", () => {
  updateCanvasSize()
  initNodes()
})

canvas.addEventListener("mousemove", (e) => {
  const rect = aboutContainer.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top + aboutContainer.scrollTop
})

canvas.addEventListener("mouseleave", () => {
  mouse.x = null
  mouse.y = null
})

// Node class
class Node {
  constructor() {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.15
    this.vy = (Math.random() - 0.5) * 0.15
    this.radius = Math.random() * 1.5 + 1.8
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1

    // Mouse interaction
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        this.x -= dx * 0.015
        this.y -= dy * 0.015
      }
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(100, 200, 255, 0.5)"
    ctx.fill()

    ctx.shadowBlur = 18
    ctx.shadowColor = "rgba(100, 200, 255, 0.4)"
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

// Initialize nodes
function initNodes() {
  nodes.length = 0
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new Node())
  }
}

function drawConnections() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.35

        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)

        const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
        gradient.addColorStop(0, `rgba(100, 200, 255, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(150, 220, 255, ${opacity})`)
        gradient.addColorStop(1, `rgba(100, 200, 255, ${opacity})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 0.9
        ctx.stroke()
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height)

  drawConnections()

  nodes.forEach((node) => {
    node.update()
    node.draw()
  })

  requestAnimationFrame(animate)
}

// Start animation
initNodes()
animate()
