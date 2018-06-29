import { createContext } from "vm";

'use strict'

export class Ball {
  constructor (ctx, x, y, r, rad = 20) {
    this.x = x
    this.y = y
    this.r = r
    this.rad = rad
    this.ctx = ctx
  }

  draw () {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    this.ctx.fillStyle = "red"
    this.ctx.fill()
    this.ctx.closePath()
  }

  move (x, y, r) {
    // let deltaX = this.x - x
    // let deltaY = this.y - y

    let force = this.rad // Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    let newX = force * Math.cos(r)
    let newY = force * Math.sin(r)
    

    this.x = x + newX
    this.y = y + newY

    console.log(force)

    this.draw()
  }
}