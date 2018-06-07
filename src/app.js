'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'

let canvas = document.createElement('canvas')
canvas.setAttribute('id', 'draw')
canvas.setAttribute('width', 1000)
canvas.setAttribute('height', 1000)

document.body.appendChild(canvas)

let ctx = canvas.getContext("2d")
ctx.font = "16px Arial"

canvas.addEventListener('mousemove', (e) => {
  let cRect = canvas.getBoundingClientRect()
  let canvasX = Math.round(e.clientX - cRect.left)
  let canvasY = Math.round(e.clientY - cRect.top)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillText(`x:${canvasX}, y:${canvasY}`, canvasX, canvasY)
})