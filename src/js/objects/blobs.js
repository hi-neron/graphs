'use stric'

function random (long) {
  return (Math.random() * long[0]) + long[1]
}

export class Blob {
  constructor (ctx, x, y, sz, d, long = [-1, 1], color = "pink") {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.sz = sz
    this.long = long
    this.color = color
    this.name = `helloW-${x}-${y}`


    this.mass = sz * d

    this.counter = 0

    this.blobDensity = 20
    this.points = []

    let segment = 2 * Math.PI / this.blobDensity

    let per = 0

    let sXi = this.x + ((random(long) + this.sz) * Math.cos(per))
    let sYi = this.y + ((random(long) + this.sz) * Math.sin(per))

    let sX = sXi
    let sY = sYi

    for (let i = 0; i  < this.blobDensity ; i++) {
      let fun = random([3, 0]) < 2 ? 'cos' : 'sin'

      let point = {
        x: sX,
        y: sY,
        p: per,
        fun
      }

      per += segment
      sX = this.x + ((random(long) + this.sz) * Math.cos(per))
      sY = this.y + ((random(long) + this.sz) * Math.sin(per))

      this.points.push(point)
    }
    this.draw()
  }

  draw () {
    this.counter += 0.1
    this.ctx.beginPath()
    this.ctx.moveTo(this.points[0].x, this.points[0].y)

    for (let i = 1; i < this.points.length; i++) {
      let x = this.points[i].x + ((Math[this.points[i].fun](this.counter) * 3) * Math.cos(this.points[i].p))
      let y = this.points[i].y + ((Math[this.points[i].fun](this.counter) * 3) * Math.sin(this.points[i].p))
      this.ctx.lineTo(x, y)
    }
    this.ctx.strokeStyle = 'white'
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
  }

  checkCollision () {}

  live () {
    this.draw()
  }
}

function pit () {
  return 
}