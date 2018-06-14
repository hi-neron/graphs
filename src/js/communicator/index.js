import html from 'choo/html'
import empty from 'empty-element'

export default class Tools {
  constructor (ctx, container, bottomBar) {
    this.container = container
    this.ctx = ctx
    this.toolActivate = 'cursor'
    this.bottomBar = bottomBar
    this.utilInfo = document.createElement('div')
    this.utilError = document.createElement('div')

    this.utilError.setAttribute('class', 'bottombar-error')
    this.utilInfo.setAttribute('class', 'bottombar-utilInfo')

    this.bottomBar.appendChild(this.utilInfo)
    this.bottomBar.appendChild(this.utilError)

  }

  prepare(toolName) {
    this.resetAll()
    this.toolActivate = toolName
    this.mouseIconChange()
    this.bottomBarChange()
  }

  resetAll () {
    this.toolActivate = null
    empty(this.utilInfo)
    empty(this.utilError)
  }

  activate () {
    return this.toolActivate ? this.toolActivate : 'cursor'
  }

  bottomBarChange () {
    let template = html`
    <div className="bottom-bar-info">
      <span> Tool activate  </span> ( ${this.toolActivate} )
    </div>
    `
    this.ctx.canvas.style.cursor = 'crosshair'
    empty(this.utilInfo).appendChild(template)
  }

  error (message) {
    let template = html`<div className="">${message}</div>`
    empty(this.utilError).appendChild(template)
    setTimeout(() => {
      empty(this.utilError)
    }, 3000);
  }

  mouseIconChange () {
    if (this.toolActivate !== 'cursor') {
      this.ctx.canvas.style.cursor = 'crosshair'
      console.log('crosshair')
    } else {
      this.ctx.canvas.style.cursor = 'pointer'
      console.log('cursor')
    }
  }
}
