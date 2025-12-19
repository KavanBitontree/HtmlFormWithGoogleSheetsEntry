// Neural Network Background Animation for Experience Page

const canvas = document.getElementById("neuralCanvas")
const ctx = canvas.getContext("2d")

const formContainer = document.querySelector(".experience-container")
let width = (canvas.width = formContainer.offsetWidth)
let height = (canvas.height = formContainer.offsetHeight)

// Nodes for neural network
const nodes = []
const nodeCount = 25
const maxDistance = 120

// Mouse position
const mouse = { x: null, y: null }

// Resize handler
window.addEventListener("resize", () => {
  width = canvas.width = formContainer.offsetWidth
  height = canvas.height = formContainer.offsetHeight
  initNodes()
})

// Mouse move handler for canvas
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
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
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.radius = Math.random() * 2 + 2
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

      if (distance < 100) {
        this.x -= dx * 0.01
        this.y -= dy * 0.01
      }
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(28, 36, 111, 0.9)"
    ctx.fill()

    // Subtle glow effect
    ctx.shadowBlur = 8
    ctx.shadowColor = "rgba(28, 36, 111, 0.6)"
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
        const opacity = (1 - distance / maxDistance) * 0.8

        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.strokeStyle = `rgba(28, 36, 111, ${opacity})`
        ctx.lineWidth = 2
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