'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'

let app = document.getElementById('app')
let container = document.createElement('div')
let canvasContainer = document.createElement('div')

container.setAttribute('class', 'main')
canvasContainer.setAttribute('class', 'canvas-container')

let canvas = document.createElement('canvas')
canvas.setAttribute('id', 'draw')

let ctx = canvas.getContext('2d')

let width = 640
let height = 640

container.appendChild(canvasContainer)
app.appendChild(container)
canvasContainer.appendChild(canvas)

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)


// graph app
// canvas
// menu

class Enviroment {
  constructor () {
    // reate menu bar
    this.menu = document.createElement('div')
    this.menu.setAttribute('class', 'main-menu')
    this.bottomBar = document.createElement('div')
    this.bottomBar.setAttribute('class', 'bottom-bar')

    let bottomBarContainer = html`
      <div className="bottom-bar-container">
        ${this.bottomBar}
      </div>
    `
    


    // user posiiton
    this.x = canvas.width/2
    this.y = canvas.height/2
    this.side = - 30
    
    // Draw interfaz
    this.bufferDraw = []

    // utilities
    this.init()

    // addMenu
    container.appendChild(this.menu)
    container.appendChild(bottomBarContainer)
  }

  init() {
    this.drawLine()
    this.drawSquare()
    this.drawStar()
    this.drawCircle()
    // boTTom bar
    this.drawBottomBar()
  }

  drawBottomBar() {
    this.bottomBar.innerHTML = `<span>X</span>: ${this.x}, <span>Y</span>: ${this.y}`
  }

  drawStar () {
    this.starButton = html`
      <div className="utils star">
        <div className="utils-star-icon"></div>
      </div>
    `
    this.menu.appendChild(this.starButton)
  }

  drawCircle () {
    this.circleButton = html`
      <div className="utils circle">
        <div className="utils-circle-icon"></div>
      </div>
    `
    this.menu.appendChild(this.circleButton)
  }

  drawSquare () {
    this.squareButton = html`
      <div className="utils square">
        <div className="utils-square-icon"></div>
      </div>
    `
    this.menu.appendChild(this.squareButton)
  }

  drawLine () {
    this.lineButton = html`
      <div className="utils square">
        <div className="utils-square-icon"></div>
      </div>
    `
    this.menu.appendChild(this.lineButton)
  }

  //mouse
  userPosition (x, y) {
    this.x = x
    this.y = y
  }

  draw () {
    this.drawBottomBar()
  }
}

canvas.onmousemove = function(e) {
  let x = e.offsetX
  let y = e.offsetY
  main.userPosition(x, y)
}

function animate () {
  main.draw()
  window.requestAnimationFrame(animate)
}

let main = new Enviroment()

document.body.onload = function () {
  animate()
}