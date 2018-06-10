'use stric'
import './_scss/main.scss'
import html from 'choo/html'
import content from './js'
import {drawCircle, drawNumbers, drawHand} from './js/utils/graph.js'

let ctx
let container = document.getElementById('app')

let canvas = document.createElement('canvas')
canvas.setAttribute('id', 'draw')

container.appendChild(canvas)

let width = window.innerWidth
let height = window.innerHeight

canvas.setAttribute('width', width)
canvas.setAttribute('height', height)

ctx = canvas.getContext('2d')


class Montre {
  constructor () {
    this.centerX = width / 2
    this.centerY = height / 2

    this.r = 150
    // radio de numeros
    this.rNumbers = this.r - (this.r * 0.1)
    this.rDays = 18
    this.daysOffset = 50
    this.months = ['lu', 'Ma', 'Mi', 'ju', 'Vi', 'Sa', 'Do']
    this.hours = ['3','4','5','6', '7', '8', '9', '10', '11', '12', '1','2']
    this.getTime()
    this.draw()
  }

  getTime () {
    let d = new Date()
    this.date = {
      hour: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
      days: d.getDay()
    }
    return this.date
  }

  draw () {
    ctx.strokeStyle = 'salmon'
    ctx.fillStyle = 'salmon'

    

    drawCircle(ctx, this.centerX, this.centerY, this.r)
    drawCircle(ctx, this.centerX, this.centerY, this.r + 3)
    drawCircle(ctx, this.centerX + this.daysOffset, this.centerY + this.daysOffset, 25)
    drawNumbers(ctx, this.centerX, this.centerY, this.rNumbers, this.hours)
    ctx.font = "7px Arial"

    drawNumbers(ctx, this.centerX + this.daysOffset, this.centerY + this.daysOffset, this.rDays, this.months)
    let date = this.getTime()

    
    for (const hand in date) {
      let dateString = date[hand]
      let toX, toY, rP, long, num
      switch (hand) {
        case 'hour':
          toX = this.centerX
          toY = this.centerY
          rP = this.r
          long = 11
          width = 4
          break;
          case 'minutes':
          toX = this.centerX
          toY = this.centerY
          rP = this.r
          long = 59
          width = 2
          break;
        case 'seconds':
          toX = this.centerX
          toY = this.centerY
          rP = this.r
          long = 59
          width = 1
          break;
          case 'days':
          toX = this.centerX + this.daysOffset
          toY = this.centerY + this.daysOffset
          rP = this.rDays - 2
          long = 6
          width = 1
          break;
      }
      
      drawHand(ctx, toX, toY, rP, long, dateString, width)    
      
    }
  }
}

let maMontre = new Montre()

function animation () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  maMontre.draw()
  
  requestAnimationFrame(animation)
}

animation()
