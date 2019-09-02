import extend from './extend.js'

function hasClass(el, className) {
  return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (!hasClass(el, className)) el.className += ' ' + className
}

function removeClass(el, className) {
  if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}

function Loading(opts) {
  this.opts = extend(true, this.constructor.defaultOptions, opts || {})

  if (typeof this.opts.container === 'string') {
    this.container = document.getElementById(this.opts.container || 'loading')
  } else {
    this.container = this.opts.container
  }

  this.init()
}

Loading.version = '1.0.0'

Loading.defaultOptions = {
  container: 'loading'
}

Loading.prototype.init = function() {
  this.createLoading()
}

Loading.prototype.createLoading = function() {
  var layer = document.createElement('div')

  layer.setAttribute('id', 'loading')
  layer.setAttribute('class', 'sfa-loading-layer')

  layer.innerHTML = `<div class="sfa-loading-bgLayer sfa-loading-dark"></div>
    <div class="sfa-loading sfa-loading-dark">
      <div class="sfa-loading-icon-tab">
        <span class="sfa-loading-tab-bglogo"></span>
        <span class="sfa-loading-tab-toplight"></span>
      </div>
    </div>
  </div>`

  this.loadingLayer = layer

  this.container.appendChild(this.loadingLayer)
}

Loading.prototype.openLoading = function(callback) {
  var that = this

  addClass(this.loadingLayer, 'sfa-loading-open')

  setTimeout(function() {
    // 等待动画执行
    that.closeLoading()
    callback && callback()
  }, 4e2)
}

Loading.prototype.closeLoading = function() {
  var that = this

  this.visible(false)

  that.container.style.display = 'block'
}

Loading.prototype.visible = function(visibility) {
  var that = this

  that.container.style.display = visibility ? 'block' : 'none'
  var parent = that.loadingLayer.parentNode
  parent.removeChild(that.loadingLayer)

  that.loadingLayer = null
}

export default Loading
