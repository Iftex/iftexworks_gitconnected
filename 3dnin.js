const model = document.querySelector('#h')
const perspective = 400
const unit = 4
let isDragging = false
let startX = 0
let startY = 0
let rotateX = 66   // initial tilt
let rotateZ = 40   // initial angle
const minX = 30    // lowest tilt (prevents flipping under)
const maxX = 80    // highest tilt (prevents top flip)

// Apply rotation transform
const moveModel = () => {
    model.style.transform = `
        perspective(${perspective * unit}px)
        rotateX(${rotateX}deg)
        rotateZ(${rotateZ}deg)
        translateZ(${-2 * unit}px)
    `
}

// Mouse down (start drag)
document.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // left click only
        isDragging = true
        startX = e.clientX
        startY = e.clientY
    }
})

// Mouse move (update rotation if dragging)
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY

        rotateZ += dx * 0.5
        rotateX = Math.min(maxX, Math.max(minX, rotateX + dy * 0.5)) // clamp

        moveModel()

        startX = e.clientX
        startY = e.clientY
    }
})

// Mouse up (stop drag)
document.addEventListener('mouseup', () => {
    isDragging = false
})

// Prevent right-click menu
// document.addEventListener('contextmenu', (e) => e.preventDefault())

// Initial render
moveModel()
