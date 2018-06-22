'use strict'

export class DashedLine {
  constructor (ctx, point1, point2, gap, dash, equal) {
    this.x1 = point1.x
    this.y1 = point1.y
    this.x2 = point2.x
    this.y2 = point2.y

    this.gap = gap
    this.dash = dash
    this.ctx = ctx
    this.equal = equal
    this.draw()
  }
  
  draw () {
    this.ctx.strokeStyle = '#999999'
    this.ctx.beginPath()
    
    if (this.equal) {
      let deltaX = this.x2 - this.x1
      let deltaY = this.y2 - this.y1
      let vectorSize = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / this.dash)
      for (var i=0; i < vectorSize; i++) {
        this.ctx[i % 2 === 0 ? 'moveTo': 'lineTo'](this.x1 + (deltaX / vectorSize) * i, this.y1 + (deltaY / vectorSize) * i)
      }
    } else if (!this.equal){
      let deltaX = this.x2 - this.x1
      let deltaY = this.y2 - this.y1

      let vectorSize = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / this.dash)
      for (var i=0; i < vectorSize; i++) {
        this.ctx[i % 2 !== 0 ? 'moveTo': 'lineTo'](this.x1 + (deltaX / vectorSize) * i, this.y1 + (deltaY / vectorSize) * i)
      }
    }
    
    this.ctx.stroke()
    this.ctx.closePath()

  }
}