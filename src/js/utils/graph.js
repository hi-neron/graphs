'use strict'

function drawCircle (ctx, x, y, r, sides = 36) {
  let max = Math.PI * 2
  let iterations = sides
  let factor = max / iterations
  let xC, yC
  ctx.beginPath()
  for(let i = 0; i <= max ; i+= factor){
    xC = x + r * Math.cos(i) 
    yC = y + r * Math.sin(i) 
    ctx.lineTo(xC, yC)
  }
  ctx.stroke()
  ctx.closePath()

}

function drawNumbers (ctx, x, y, rNumbers, items) {
  const NUMBERS = items
  let max = Math.PI * 2
  let iterations = NUMBERS.length
  let factor = max / iterations
  let xC, yC
  for (let i = 0, c = 0; i < max ; i+= factor, c++) {
    let hour = NUMBERS[c]
    let widthH = ctx.measureText(hour).width / 2
    xC = (x - widthH) + rNumbers * Math.cos(i) 
    yC = (y + 3) + rNumbers * Math.sin(i)
    ctx.fillText(hour, xC, yC) 
  }
}

function drawHand (ctx, x, y, r, long, num, width) {
  let max = Math.PI * 2
  let unit = num * max / long
  r = r - 40
  let toX = x + r * Math.cos(unit)
  let toY = y + r * Math.sin(unit)
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.moveTo(x, y)
  ctx.lineTo(toX, toY)
  ctx.stroke()
  
}

export {
  drawCircle,
  drawNumbers,
  drawHand
}