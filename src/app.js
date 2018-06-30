'use stric'
import './_scss/main.scss'
import { Blob } from'./js/objects/blobs'
import { Player } from'./js/objects/player'

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
    this.ctx = ctx
    this.objects = []
    this.player = new Player(this.ctx, width / 3, 100, 8, 10)

    this.objects.push(this.player)
  }

  createBlob(x, y, sz, d, long, color) {
    let newBlob = new Blob(this.ctx, x, y, sz, d, long, color)
    this.objects.push(newBlob)
    this.player.addObject(newBlob)
  }

  // buscar si el blob esta cerca
  // si esta cerca activar la fuerza

  live () {
    this.ctx.clearRect(0, 0, width, height)
    let _this_ = this
    this.objects.forEach(el => {
      el.live()
    });
  }
}

// create World
let myEnvironment = new Environment()
myEnvironment.createBlob(width - 200, 200, 50, 60, [-10, 10])
myEnvironment.createBlob(width / 5 , height / 3, 20, 100, [1, 0])
myEnvironment.createBlob(width / 3 , height - 200, 150, 30, [-10, 10])
myEnvironment.createBlob(width / 2 , height / 5 , 50, 10, [-10, 10])

function animate () {
  myEnvironment.live()
  window.requestAnimationFrame(animate)
}

animate()
