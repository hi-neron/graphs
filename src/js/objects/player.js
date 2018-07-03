'use strict'

function random (long) {
  return (Math.random() * long[0]) + long[1]
}

function gravity (m1, m2, d) {
  const G = 0.0005 // le G du un monde dans caricature
  return G * (m1 * m2 / d)
}

function intersect (p1a, p1b, p2a, p2b) {
  const o1 = p1a
  const o2 = p2a
  const d1 = o1 - p1b
  const d2 = o2 - p2b
  const det = (d1[0] * d2[1]) - (d2[0] * d1[1])
  if (Math.abs(det) < Number.EPSILON) {
    return null
  }
  const d20o11 = d2[0] * o1[1]
  const d21o10 = d2[1] * o1[0]
  const d20o21 = d2[0] * o2[1]
  const d21o20 = d2[1] * o2[0]

  const t = (((d20o11 - d21o10) - d20o21) + d21o20) / det
  return o1
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

    if (this.actualWorld) {
      this.ctx.beginPath()
      this.ctx.arc(this.actualWorld.contactX, this.actualWorld.contactY, 20, 0, 2 * Math.PI)
      this.ctx.fillStyle = 'red'
      this.ctx.fill()
      this.ctx.closePath()
    }
    
    if (this.point1) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.point1.x, this.point1.y)
      this.ctx.lineTo(this.point2.x, this.point2.y)
      this.ctx.strokeStyle = 'green'
      this.ctx.stroke()
      this.ctx.closePath()
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

      if (obj.distance - obj.sz < 100) {
        this.actualWorld = obj
      }
    }
    
    if (this.actualWorld) {
      for (let i = 0; i < this.actualWorld.points.length - 1; i++) {
        let point1 = this.actualWorld.points[i]
        let point2 = this.actualWorld.points[i + 1]

        let pointAngle = point1.p
        let pointAngle2 = point2.p

        let myAngle = this.actualWorld.angleTo
        console.log(myAngle)
        
        if ( myAngle > pointAngle && myAngle < pointAngle2) {
          let d =  ((this.y - this.actualWorld.y) * (this.x - this.actualWorld.x)) - ((point1.y - point2.y) * (point1.x - point2.x))
          
          this.point1 = point1
          this.point2 = point2
          if (d != 0) {

            let line1StartX = point1.x
            let line1StartY = point1.y
            let line2StartX = this.actualWorld.x
            let line2StartY = this.actualWorld.y

            let line1EndX = point2.x
            let line1EndY = point2.y
            let line2EndX = this.x
            let line2EndY = this.y
            
            let a = line1StartY - line2StartY
            let b = line1StartX - line2StartX

            let numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
            let numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);

            a = numerator1 / d;
            b = numerator2 / d;
        
            // if we cast these lines infinitely in both directions, they intersect here:
            this.actualWorld.contactX = line1StartX + (a * (line1EndX - line1StartX));
            this.actualWorld.contactY = line1StartY + (a * (line1EndY - line1StartY));
        /*
                // it is worth noting that this should be the same as:
                x = line2StartX + (b * (line2EndX - line2StartX));
                y = line2StartX + (b * (line2EndY - line2StartY));
                */

          } else {
            console.log('parallel')
          }
        }
      }
    }

    this.draw()
  }
}