'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import { DashedLine } from './js/libs'

let app = document.getElementById('app')
let canvas = document.createElement('canvas')

canvas.setAttribute('id', 'draw')

let ctx = canvas.getContext('2d')

let width = window.innerWidth
let height = window.innerHeight

app.appendChild(canvas)

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)

let balls = []

// randomNumber
function random (max = 1, min = 0) {
  return Math.round(Math.random() * (max - min)) + min
}

class Ball {
  constructor (x, y, r, distance) {
    this.x = x
    this.y = y
    this.r = random(r * 3, 2)
    this.centerX = x
    this.centerY = y
    this.distance = distance | random(20, 15)

    let colorYellow = random(255, 240)
    let colorGreen = random(120, 50)
    let colorBlue = random(120, 100)

    this.season = random(2) > 1? true: false

    if (this.season) {
      this.color = `rgb(${colorYellow}, ${colorYellow}, ${0})`
    } else {
      this.color = `rgb(${colorYellow}, ${colorGreen}, ${colorBlue})`
    }

    this.draw()
  }

  draw () {
    ctx.beginPath()
    ctx.moveTo(this.centerX, this.centerY)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = 'black'
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = 'rgba(0, 0, 0, .25)'
    ctx.moveTo(this.centerX, this.centerY)
    ctx.lineTo(this.centerX, this.y + this.distance)
    ctx.stroke()
    ctx.closePath()
    
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  followUser(x, y) {
    let deltaX = x - this.centerX
    let deltaY = y - this.centerY

    let newX = x
    let newY = y
    
    let maxDistance = this.distance
    let max = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (max > maxDistance) {
      let tX = Math.acos(deltaX / max)
      let tY = Math.asin(deltaY / max)

      newX = this.centerX + (maxDistance * Math.cos(tX))
      newY = this.centerY + (maxDistance * Math.sin(tY))
    }

    this.x = newX
    this.y = newY

    this.draw()
  }
}

// let myBall = new Ball(width / 2, 300, 30)

function animate () {
  // balls.forEach(element => {
    //   element.live()
    // });
    window.requestAnimationFrame(animate)
  }


function followBall(e) {
  ctx.clearRect(0, 0, width, height)
  let x = e.clientX
  let y = e.clientY

  balls.forEach(element => {
    element.followUser(x, y)
  });
}

function createRose (x, y) {
  // ctx.clearRect(0, 0, width, height)
  balls.push(new Ball(x, y, 2))
}

document.addEventListener('mousemove', followBall)

let distance = 25
let rows = 42
let columns = 42

for (let x = 0; x < rows; x++) {
  for (let y = 0; y < columns; y++) {
    createRose(x * distance, y * distance)
  }
}
