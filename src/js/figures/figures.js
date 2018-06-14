let hitCanvas = document.createElement('canvas')
hitCanvas.setAttribute('id', 'hitDraw')

let canvasContainer = document.getElementById('main-container')

let ctxH

function dAndA(x1, y1, x2, y2){
  var x = x2 - x1,
      y = y2 - y1
  return {x, y}
}

function randomColor (max = 1, min = 0) {
  return Math.floor(Math.random() * Math.floor(max)) + min
}

class Line  {
  constructor (ctx, x1, y1, color = '#575757', width = 1) {
    this.x1 = x1
    this.type = 'line'
    this.y1 = y1
    this.ctx = ctx
    this.creatorColor = color
    this.color = color
    this.strokeWidth = width
    this.hitColor = `rgb(${randomColor(255)}, ${randomColor(255)}, ${randomColor(255)})`
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

  move(x, y, sumX, sumY) {

    // convertir x y y en un punto medio
    // para sumarlo a las posisicones
    let x1 = this.x1
    let y1 = this.x2

    console.log(sumX, sumY)
  }

  draw() {
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x1, this.y1)
    this.ctx.lineTo(this.x2, this.y2)
    this.ctx.stroke()

    ctxH.strokeStyle = this.hitColor
    ctxH.lineWidth = 7
    ctxH.beginPath()
    ctxH.moveTo(this.x1, this.y1)
    ctxH.lineTo(this.x2, this.y2)
    ctxH.stroke()
  }

  over() {
    this.color = "rgb(255, 85, 99)"
    this.draw()
  }

  getHitColor () {
    return this.hitColor
  }
  
  normal () {
    this.color = this.creatorColor
    this.draw()
  }
}

class DrawingBoss {
  constructor (ctx, list, communicator, canvasContainer) {
    this.ctx = ctx

    ctxH = hitCanvas.getContext('2d')

    this.canvas = ctx.canvas
    this.ctxH = ctxH

    this.possibleFigures = {
      line: Line
    }

    // hit canvas
    canvasContainer.appendChild(hitCanvas)

    // focused figures
    this.colorKey = null
    this.editing = false

    hitCanvas.setAttribute('width', this.canvas.width)
    hitCanvas.setAttribute('height', this.canvas.height)

    this.figures = list
    this.communicator = communicator
  }

  startAction (tool, x, y) {
    if (tool !== 'cursor') {
      /** 
       * busca si esta el cursor activado para entrar en modo
       * CREACION
      */
      this.edit = false
      this.figureOnBuffer = new this.possibleFigures[tool](this.ctx, x, y)
      console.log(this.figureOnBuffer.x1,this.figureOnBuffer.y1)
    } else {
      /*
        Entra en modo edicion
      */
      this.edit = true
      console.log('cursor on')
    }
  }

  constructAction (x, y) {
    let c = this.ctxH.getImageData(x, y, 1, 1).data
    let color = `rgb(${c[0]}, ${c[1]}, ${c[2]})`

    // this.ctxH.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // for (let i = 0; i < this.figures.length; i++) {
    //   let figure = this.figures[i]
    //   if (color === fColor) {
    //     figure.over()
    //   } else {
    //     figure.normal()
    //   }
    // }
  }

  endAction() {

  }

  newFigure (figure) {
    let created = figure.finished()
    this.colorKey = null
    if (created) {
      this.editing = false
      this.focus = null
      this.figures.push(figure)
    } else if (this.focus) {
      this.getFigure()
    } else {
      this.communicator.error('impossible figure')
    }
  }

  editFigure (x, y) {
    let x1 = this.focus.x1
    let x2 = this.focus.x2
    let y1 = this.focus.y1
    let y2 = this.focus.y2
    let sumX = dAndA(x1, y1, x, y)
    let sumY = dAndA(x2, y2, x, y)
    this.focus.move(x, y, sumX, sumY)
  }

  getFigure () {
    for (let i = 0; i < this.figures.length; i++) {
      let figure = this.figures[i]
      let fColor = figure.getHitColor()
      if (this.colorKey === fColor) {
        this.focus = figure
        this.editing = true
        console.log(this.focus)
        break;
      } else {
        this.focus = null
      }
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