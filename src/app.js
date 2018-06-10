'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'

delete Object.prototype.__proto__

let app = document.getElementById('app')
let canvas = document.createElement('canvas')

canvas.setAttribute('id', 'draw')

let width = window.innerWidth
let height = window.innerHeight

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)

app.appendChild(canvas)

let ctx = canvas.getContext('2d')

class Enviroment {
  constructor () {
    this.rubberBand = document.createElement('div')
    this.canvas = canvas
    this.rubberBand.setAttribute('class', 'rubberBand')
    this.rubberInitX = 0
    this.rubberInitY = 0
    app.appendChild(this.rubberBand)
  }

  createBand (x, y) {
    this.rubberBand.style.display = 'block'
    this.setRuberOriginX(x)
    this.setRuberOriginY(y)
  }
  
  setRuberOriginX (x) {
    this.rubberInitX = x
    this.rubberBand.style.left = `${this.rubberInitX}px`
  }
  
  setRuberOriginY (y) {
    this.rubberInitY = y
    this.rubberBand.style.top = `${this.rubberInitY}px`
  }

  resizeBand (x, y) {
    let width = x - this.rubberInitX
    let height = y - this.rubberInitY
    
    if(width < 1) {
      this.setRuberOriginX(x)
    }
    if(height < 1) {
      this.setRuberOriginY(y)
    }

    this.rubberBand.style.width = `${width}px`
    this.rubberBand.style.height = `${height}px`
    console.log(width, height)
  }

  finishBand () {
    this.rubberBand.style.display = 'none'
    console.log('finish')
  }
}

canvas.onmousedown = function (e) {
  let x = e.clientX
  let y = e.clientY
  myEnviroment.createBand(x, y)
}

window.onmousemove = function (e) {
  let x = e.clientX
  let y = e.clientY
  myEnviroment.resizeBand(x, y)
}

window.onmouseup = function (e) {
  myEnviroment.finishBand()
}

let myEnviroment = new Enviroment()
