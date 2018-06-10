'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'

let app = document.getElementById('app')

let canvas = document.createElement('canvas')
canvas.setAttribute('id', 'draw')

let ctx = canvas.getContext('2d')

let width = window.innerWidth
let height = window.innerHeight

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)

app.appendChild(canvas)


class MousePositions {
  constructor () {
    this.x = canvas.width/2
    this.y = canvas.height/2
    this.side = - 30
  }

  guides (x, y) {
    this.x = x
    this.y = y
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.lineVertical()
    this.lineHorizontal()
  }

  changeSide () {
    if(this.x > canvas.width / 2) {
      this.side = -30
    } else {
      this.side = 5
    }
  }

  lineVertical() {
    this.changeSide()
    ctx.strokeStyle = 'salmon'
    ctx.beginPath()
    ctx.moveTo(this.x, 0)
    ctx.lineTo(this.x, canvas.height)
    ctx.stroke()
    ctx.fillText(`x: ${this.x}`, this.x + this.side, this.y - 3)
  }
  
  lineHorizontal() {
    ctx.strokeStyle = 'salmon'
    ctx.beginPath()
    ctx.moveTo(0, this.y)
    ctx.lineTo(canvas.width, this.y)
    ctx.stroke()
    ctx.fillText(`y: ${this.y}`, this.x + this.side, this.y + 10)
  }
}

canvas.onmousemove = function(e) {
  let x = e.clientX
  let y = e.clientY
  enviroment.guides(x, y)
}

let enviroment = new MousePositions()