'use stric'
import './_scss/main.scss'
import { Ball } from './modules/class'
import html from 'choo/html'

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

  createBall (x, y, r, t) {
    let newElement = new Ball(this.ctx, x, y, r, t)
    this.createdItems.push(newElement)
    newElement.draw()
  }

  animate() {
    this.ctx.clearRect(0, 0, width, height)
    console.log(this.user)
    let _this_ = this
    this.counter += 0.2

    this.createdItems.forEach( el => {
      el.move(_this_.user.x, _this_.user.y, _this_.counter)
    })
  }
}

let myEnvironment = new Environment()

myEnvironment.createBall(width/2, height/2, 1, 5)
myEnvironment.createBall(width/2, height/2, 1.2, 15)
myEnvironment.createBall(width/2, height/2, 1.5, 25)
myEnvironment.createBall(width/2, height/2, 2, 35)

function animate () {
  myEnvironment.animate()
  window.requestAnimationFrame(animate)
}

animate()