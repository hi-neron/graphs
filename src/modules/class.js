import { createContext } from "vm";

'use strict'

export class SinLine {
  constructor (ctx, p1, p2, dimension) {
    this.x1 = p1.x
    this.y1 = p1.y
    this.x2 = p2.x
    this.y2 = p2.y
    this.ctx = ctx
    this.d = dimension
    this.yFactor = 0
    this.sensitiveAreaF = 10

    this.qu = 0.15

    this.yMax = ctx.canvas.height

    this.definition = 60

    let deltaX = this.x2 - this.x1
    let deltaY = this.y2 - this.y1

    this.size = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    this.angle = Math.atan2(deltaY, deltaX)

    this.longPiece = this.size / this.definition

    this.points = []

    let xi = this.x1
    let yi = this.y1

    for (let p = 0; p < this.definition; p++) {
      let x = xi + (this.longPiece * Math.cos(this.angle))
      let y = yi + (this.longPiece * Math.sin(this.angle))
      let newPoint = {
        x0 : x,
        y0 : y,
        x,
        y
      }
      xi = x
      yi = y
      this.points.push(newPoint)
    }

    this.draw()
  }

  draw (x) {
    let deltaX = this.x2 - this.x1
    let min = Math.min(this.x1, this.x2)

    this.ctx.beginPath()
    this.ctx.moveTo(this.x1, this.y1)
    let _this_ = this
    for (let p = 0; p < this.points.length; p++) {
      // look for x at te same point
      this.points.forEach(el => {
        if ( x > el.x - _this_.longPiece * _this_.sensitiveAreaF && x < el.x + _this_.longPiece * _this_.sensitiveAreaF) {
          el.y += this.qu
          if (el.y > el.y0 + _this_.yMax) {
            el.y = el.y0 + _this_.yMax
          }
        } else {
          el.y -= this.qu
          if (el.y < el.y0 ) {
            el.y = el.y0
          }
        }
      });
      this.ctx.lineTo(this.points[p].x, this.points[p].y)
    }
    this.ctx.lineTo(this.x2, this.y2 - 400)
    this.ctx.lineTo(this.x1, this.y1 - 400)

    this.ctx.strokeStyle = 'rgb(55, 55, 55)'
    this.ctx.fillStyle = 'rgb(10, 0, 20)'
    this.ctx.shadowOffsetY = 15
    this.ctx.shadowBlur = 0
    this.ctx.shadowColor = 'rgba(119, 80, 75, 0.3)'
    this.ctx.fill()
    this.ctx.closePath()

  }

  move (x) {
    this.draw(x)
  }
}