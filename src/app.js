'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import { Line, DrawingBoss } from './js/figures/figures'
import Communicator from './js/communicator';

let app = document.getElementById('app')
let container = document.createElement('div')
let canvasContainer = document.createElement('div')

container.setAttribute('class', 'main')
canvasContainer.setAttribute('class', 'canvas-container')
canvasContainer.setAttribute('id', 'main-container')

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

class Environment {
  constructor () {
    this.width = width
    this.height = height

    // hit canvas
    this.hitCanvas = document.createElement('canvas')
    this.hitCanvas.setAttribute('class', 'hit-canvas')

    // reate menu bar
    this.menu = document.createElement('div')
    this.menu.setAttribute('class', 'main-menu')

    // bottombar
    this.bottomBar = document.createElement('div')
    this.bottomBar.setAttribute('class', 'bottom-bar')

    // bottombar parts
    this.bottomBarMouse = document.createElement('div')
    this.bottomBarToolBar = document.createElement('div')

    this.bottomBarMouse.setAttribute('class', 'bottombar-mouse bottombar-items')
    this.bottomBarToolBar.setAttribute('class', 'bottombar-tools bottombar-items')

    // mousePos ---->  tool   ---->
    this.bottomBar.appendChild(this.bottomBarMouse)
    this.bottomBar.appendChild(this.bottomBarToolBar)

    // this controls the tools
    this.communicator = new Communicator(ctx, container, this.bottomBarToolBar)

    // graphics
    this.graphicsDraw = []
    this.drawingBoss = new DrawingBoss(ctx, this.graphicsDraw, this.communicator, canvasContainer)
    
    // the board
    this.canvas = canvas

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
    this.drawBag = []

    // utilities
    this.init()

    // addMenu
    container.appendChild(this.menu)
    container.appendChild(bottomBarContainer)

    let _this = this

    this.menu.addEventListener('click', (e) => {
      try {
        let utilActive = e.target.closest('.utils').title
        _this.communicator.prepare(utilActive)
        _this.drawingBoss.setUtil(utilActive)
      } catch (e) {
      }
    })

    window.onkeyup = function (e) {
      let key = e.code
      if (key === 'Escape') {
        _this.communicator.resetAll()
      }
    }

    this.canvas.onmousedown = function(e) {
      let x = e.offsetX
      let y = e.offsetY
      _this.userPosition(x, y)
      let tool = _this.communicator.activate()
      _this.drawingBoss.startAction( x, y)

      // if (tool) {
      //   /**
      //    Creation mode
      //    abrir una herramienta
      //    */
      //   console.log(`creating ${tool}`)
      //   _this.drawing = true
      //   _this.drawingBoss.startAction(tool, x, y)
      // } else if (tool) {
      //   /*
      //   Edition mode
      //   dar click en una linea
      //   */
      //  console.log(`editing ${piece}`)
      // } else {
      //   console.log('nothing in particular')
      // }

      // // Creation Mode
      // if (tool && !util) {
      //   console.log('Tool mode')
      //   _this.drawing = true
      //   _this.editing = false
      //   try {

      //   } catch (e) {
      //     _this.communicator.error('util error')
      //   }
      //   // Edition mode
      // } else {
      //   console.log('Edition mode')
      //   _this.drawing = false
      //   _this.editing = true
      //   _this.drawingBoss.getFigure()
      // }
    }


    this.canvas.onmousemove = function(e) {
      let x = e.offsetX
      let y = e.offsetY
      _this.drawBottomBar()
      _this.userPosition(x, y)
      // follow mouse user posiiton
      ctx.clearRect(0, 0, _this.width, _this.height)
      _this.drawingBoss.userSupervisor(x, y)
      // if(_this.drawing) {
      //   _this.drawingBoss.ctxH.clearRect(0, 0, _this.width, _this.height)
      //   _this.drawingBoss.sizing(x, y)
      //   _this.drawingBoss.exec()
      // } else {
      //   _this.drawingBoss.onMouse(x, y)
      // }
    }

    window.onmouseup = function(e) {
      let x = e.offsetX
      let y = e.offsetY
      _this.drawBottomBar()
      _this.drawingBoss.endAction()

      // if(_this.drawing) {
      //   _this.drawingBoss.newFigure(_this.figureOnBuffer)
      //   ctx.clearRect(0, 0, _this.width, _this.height)
      //   _this.drawingBoss.ctxH.clearRect(0, 0, _this.width, _this.height)
      //   _this.drawingBoss.exec()
      //   _this.drawing = false
      // }
      // _this.drawingBoss.colorKey = null
    }
  }

  activateUtil (utilName) {
    this.communicator.prepare(utilName)
  }

  init() {
    this.cursor()
    this.drawLine()
    this.drawSquare()
    this.drawCircle()
    this.drawStar()
    // boTTom bar
    this.drawBottomBar()
  }

  drawBottomBar() {
    this.bottomBarMouse.innerHTML = `<span>X</span>: ${this.x}, <span>Y</span>: ${this.y}`
  }

  cursor () {
    this.cursorButton = html`
      <div className="utils cursor" title="cursor">
        <div className="utils-cursor-icon">
          <svg width="36" height="36">
            <g transform="translate(8, 8)">
              <path d="M4 0l16 12.279-6.78 1.138 4.256 8.676-3.902 1.907-4.281-8.758-5.293 4.581z" stroke="rgb(255, 153, 170)" fill="rgba(255, 192, 203, 0.2)" stroke-width="2px" />
            </g>
          </svg>
        </div>
      </div>
    `
    this.menu.appendChild(this.cursorButton)
  }

  drawStar () {
    this.starButton = html`
      <div className="utils poligon" title="poligon">
        <div className="utils-poligon-icon">
          <svg width="36" height="36">
            <polygon points="20 8, 32 19, 26 31, 14 31, 8 19" stroke="rgb(255, 153, 170)" fill="rgba(255, 192, 203, 0.2)" stroke-width="2px" />
          </svg>
        </div>
      </div>
    `
    this.menu.appendChild(this.starButton)
  }

  drawCircle () {
    this.circleButton = html`
      <div className="utils circle" title="circle">
        <div className="utils-circle-icon">
          <svg width="36" height="36">
            <circle cx="20" cy="20" r="11.5" stroke="rgb(255, 153, 170)" fill="rgba(255, 192, 203, 0.2)" stroke-width="2px" />
          </svg>
        </div>
      </div>
    `
    this.menu.appendChild(this.circleButton)
  }

  drawSquare () {
    this.squareButton = html`
      <div className="utils square" title="square">
        <div className="utils-square-icon">
          <svg width="35" height="35">
            <rect x="9" y="9" width="21" height="21" stroke="rgb(255, 153, 170)" fill="rgba(255, 192, 203, 0.2)" stroke-width="2px" />
          </svg>
        </div>
      </div>
    `
    this.menu.appendChild(this.squareButton)
  }

  drawLine () {
    this.lineButton = html`
      <div className="utils square" title="line">
        <div className="utils-square-icon">
          <svg width="35" height="35">
            <line x1="9" y1="9" x2="30" y2="30" stroke="rgb(255, 153, 170)" fill="rgba(255, 192, 203, 0.2)" stroke-width="2px" />
          </svg>
        </div>
      </div>
    `
    this.menu.appendChild(this.lineButton)
  }

  //mouse
  userPosition (x, y) {
    this.x = x
    this.y = y
  }
}

// function animate () {
//   main.draw()
//   window.requestAnimationFrame(animate)
// }


document.body.onload = function () {
  let main = new Environment()
}