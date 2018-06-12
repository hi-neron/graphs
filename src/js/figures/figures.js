class Line {
  constructor (ctx, x1, y1, color = '#575757', width = 1) {
    this.x1 = x1
    this.type = 'line'
    this.y1 = y1
    this.ctx = ctx
    this.color = color
    this.width = width
    console.log(`line ${x1} ${y1}`)
  }

  sizing (x2, y2) {
    this.x2 = x2
    this.y2 = y2
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x1, this.y1)
    this.ctx.lineTo(this.x2, this.y2)
    this.ctx.stroke()
  }

  finished() {
    this.width = Math.abs(this.x2 - this.x1)
    this.height = Math.abs(this.y2 - this.y1)
    // let activateArea = this.y2 - this.y1
    // el mouse contenga un area pequeña
    // cuando lleve su area al rededor active las interacciones
    // con los objetos cercanos a su area
    // Active las interacciones de los items cercanos a el area

    return this.width > 0 || this.height > 0 ? true: false
  }

  draw() {
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x1, this.y1)
    this.ctx.lineTo(this.x2, this.y2)
    this.ctx.stroke()
  }

  mouseOver(x, y) {

  }
}

class DrawingBoss {
  constructor (ctx, list, communicator) {
    this.ctx = ctx
    this.figures = list
    this.communicator = communicator
    console.log(list)
  }

  newFigure (figure) {
    let created = figure.finished()
    if (created) {
      this.figures.push(figure)
      console.log(`new ${figure.type} has been created`)
    } else {
      this.communicator.error('impossible figure')
    }
  }

  onMouse (x, y) {
    for(let i = 0; i < this.figures.length; i++) {
      let figure = this.figures[i]
      figure.mouseOver(x, y)
    }
  }

  exec () {
    for(let i = 0; i < this.figures.length; i++) {
      let figure = this.figures[i]
      figure.draw()
    }
  }
}

export { Line, DrawingBoss }