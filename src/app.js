'use stric'
// import html from 'choo/html'
import './_scss/main.scss'
import { SinLine } from './modules/class'

// _ _ _ _ _ _

let app = document.getElementById('app')
let canvas = document.createElement('canvas')

canvas.setAttribute('id', 'draw')

let ctx = canvas.getContext('2d')

let width = window.innerWidth
let height = window.innerHeight

app.appendChild(canvas)

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)



class Environment {
  constructor () {
    this.createdItems = []
    this.ctx = ctx
    this.counter = 0
    this.user = {
      x : null,
      y : null
    }

    let _this_ = this

    window.addEventListener('mousemove', (e) => {
      _this_.user.x = e.clientX
      _this_.user.y = e.clientY
    })
  }

  createSinLine (x, y, r, t) {
    let newElement = new SinLine(this.ctx, x, y, r, t)
    this.createdItems.push(newElement)
  }

  animate() {
    this.ctx.clearRect(0, 0, width, height)

    let _this_ = this
    this.counter += 0.2

    this.createdItems.forEach( el => {
      el.move(_this_.user.x)
    })
  }
}

let myEnvironment = new Environment()
let d = width / 2 + 100

let p1 = {
  x: width / 2 - d,
  y: 5
}

let p2 = {
  x: width / 2 + d,
  y: 5
}

myEnvironment.createSinLine(p1, p2, d)

function animate () {
  myEnvironment.animate()
  window.requestAnimationFrame(animate)
}

animate()
