'use strict'

function random (long) {
  return (Math.random() * long[0]) + long[1]
}

function gravity (m1, m2, d) {
  const G = 0.0002 // le G du un monde dans caricature
  return G * (m1 * m2 / d)
}


export class Player {
  constructor (ctx, x, y, sz, d) {
    
    this.x = x
    this.y = y
    this.sz = sz
    this.ctx = ctx
    this.segment =  Math.PI / 20
    this.mass = sz * d
    this.forces = []

    this.objects = []
    this.actualWorld = null

    let p1 = {
      x : sz * Math.cos(this.segment * 7),
      y : sz * Math.sin(this.segment * 7)
    }

    let p2 = {
      x : sz * Math.cos(this.segment * 13),
      y : sz * Math.sin(this.segment * 13)
    }

    let p3 = {
      x : sz * Math.cos(this.segment * 27),
      y : sz * Math.sin(this.segment * 27)
    }

    let p4 = {
      x : sz * Math.cos(this.segment * 33),
      y : sz * Math.sin(this.segment * 33)
    }

    this.boundBox = [p1, p2, p3, p4]

  }

  draw () {
    this.ctx.beginPath()
    this.ctx.moveTo(this.x + this.boundBox[0].x, this.y + this.boundBox[0].y)
    this.ctx.arc(this.x, this.y, this.sz, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'rgb(250, 250, 220)'
    this.ctx.fill()
    this.ctx.closePath()

    for (let i = 0; i < this.objects.length; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, this.y)
      this.ctx.lineTo(this.objects[i].x, this.objects[i].y)
      this.ctx.strokeStyle = 'white'
      this.ctx.lineWidth = 0.3
      this.ctx.stroke()
      this.ctx.closePath()

      // // draw text
      // let xT = this.objects[i].distance / 3 * Math.cos(this.objects[i].angle)
      // let yT = this.objects[i].distance / 3 * Math.sin(this.objects[i].angle)
    }

  }

  force (el) {
    this.draw()
  }

  addObject(obj) {
    let interObj = obj
    let x1 = this.x
    let x2 = obj.x
    let y1 = this.y
    let y2 = obj.y

    let deltaX = x2 - x1
    let deltaY = y2 - y1

    interObj.distance = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY))
    interObj.angleTo = Math.atan2(deltaY, deltaX)
    interObj.force = gravity(this.mass, obj.mass, interObj.distance)

    this.objects.push(interObj)
  }
  live() {
    for (let o = 0; o < this.objects.length; o++) {
      let obj = this.objects[o]
      let deltaX = obj.x - this.x
      let deltaY = obj.y - this.y

      
      obj.distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      obj.force = gravity(this.mass, obj.mass, obj.distance)
      this.x = this.x + (obj.force * Math.cos(obj.angleTo))
      this.y = this.y + (obj.force * Math.sin(obj.angleTo))
      obj.angleTo = Math.atan2(deltaY, deltaX)

      if (obj.distance - obj.sz < 50) {
        this.actualWorld = obj
      }
    }
    
    if (this.actualWorld) {
      for (let i = 0; i < this.actualWorld.points.length - 1; i++) {
        let pointAngle = this.actualWorld.points[i].p
        let pointAngle2 = this.actualWorld.points[i + 1].p
        if (this.actualWorld.angleTo > pointAngle && this.actualWorld.angleTo < pointAngle2) {
          console.log(pointAngle, pointAngle2)
        }
      }
    }

    this.draw()
  }
}