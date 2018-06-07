'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'

let innerW = window.innerWidth
let innerH = window.innerHeight

let container = document.getElementById('app')

let canvas = document.createElement('canvas')
container.appendChild(canvas)

canvas.setAttribute('width', innerW)
canvas.setAttribute('height', innerH)

let button = document.getElementById('button')

let ctx = canvas.getContext("2d")
let originX = canvas.width / 2
let originY = canvas.height / 2
let velocity = 1

ctx.textAlign = "center"
ctx.textBaseline = "mniddle"
ctx.fillStyle = "#f34"
ctx.font = "844px Arial"
ctx.fillText("Salut Monde", originX, originY)
ctx.translate(originX, originY)


button.addEventListener('mousedown', (e) => {
  ctx.fillText("", 0, 0);
  ctx.translate(-originX, -originY)
})

function animate () {
  ctx.rotate((Math.PI / 180) * velocity);
  ctx.fillStyle = randomColor()
  ctx.fillText("Salut Monde", 0, 0);
  requestAnimationFrame(animate)
}

function randomColor () {
  let color = '#'
  for (let i = 0; i <= 3; i++){
    color = color+(Math.round(Math.random() * 255)).toString(16)
  }
  return color
}

animate()
