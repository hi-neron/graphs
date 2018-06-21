'use stric'
import './_scss/main.scss'
import html from 'choo/html'

let app = document.getElementById('app')
let canvas = document.createElement('canvas')

canvas.setAttribute('id', 'draw')

let ctx = canvas.getContext('2d')

let width = 640
let height = 640

app.appendChild(canvas)

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)

