// ;(function(global, factory) {
//   if (typeof exports === 'object' && typeof module === 'object') {
//     module.exports = factory()
//   } else if (typeof define === 'function' && define.amd) {
//     define([], factory())
//   } else if (typeof exports === 'object') {
//     exports['WaterFall'] = factory()
//   } else {
//     global['WaterFall'] = factory()
//   }
// })(window, function() {
// var event = require('./event')
// var extend = require('./extend')

import event from './event.js'
import extend from './extend.js'

function noop() {}

function WaterFall(opts) {
  this.opts = extend(true, {}, this.constructor.defaultOptions, opts || {})

  this.container =
    typeof this.opts.container === 'string'
      ? document.getElementById(this.opts.container)
      : this.opts.container

  this.colHeight = [] // 每列的高度
  this.colContainer = []

  this.init()
}

WaterFall.version = '1.0.0'

WaterFall.defaultOptions = {
  container: 'waterfall',
  col: 5,
  gapWidth: 10,
  gapHeight: 10,
  onClickListener: function() {}
}

WaterFall.prototype = new event.EventEmitter()

WaterFall.prototype.constructor = WaterFall

WaterFall.prototype.init = function() {
  // 初始化 col 宽度
  var rect = this.container.getBoundingClientRect() // container width
  this.colWidth = parseInt(
    (rect.width - (this.opts.col - 1) * this.opts.gapWidth) / this.opts.col
  ) // col width

  var colContainer = document.createElement('div')
  colContainer.setAttribute('id', 'waterfall_col')

  for (var i = 0; i < this.opts.col; i++) {
    var div = document.createElement('div')

    div.setAttribute('id', 'waterfall_col_' + i)
    div.style.cssFloat = 'left'
    div.style.width = this.colWidth + 'px'
    // div.style.backgroundColor = 'red'
    // div.style.minHeight = '100px'

    this.opts.col !== i + 1 && (div.style.marginRight = this.opts.gapWidth)

    colContainer.appendChild(div)

    this.colContainer.push(div)

    this.colHeight[i] = 0
  }

  var clearfix = document.createElement('div')
  clearfix.style.clear = 'both'

  colContainer.appendChild(clearfix)

  this.container.appendChild(colContainer)
}

WaterFall.prototype.findMinCol = function() {
  return this.colHeight.indexOf(Math.min.apply(Math, this.colHeight))
}

WaterFall.prototype.findMaxCol = function() {
  return this.colHeight.indexOf(Math.max.indexOf(Math, this.colHeight))
}

WaterFall.prototype.append = function(src, callback) {
  var that = this

  this.createImage(src, function(minIndex, image, displayHeight) {
    that.appendToCol(minIndex, image, displayHeight, callback)
  })
}

WaterFall.prototype.appendToCol = function(index, el, height, callback) {
  if (el) {
    el.style.width = '100%'

    var div = document.createElement('div')
    div.style.marginBottom = this.opts.gapHeight + 'px'
    div.appendChild(el)

    addEvent(div, 'click', this.opts.onClickListener)

    el.style.opacity = 1

    this.colContainer[index].appendChild(div)
    this.colHeight[index] += parseInt(height + this.opts.gapHeight)
  }

  callback && callback()
}

WaterFall.prototype.createImage = function(src, callback) {
  var that = this
  var minIndex = this.findMinCol()

  var image = new Image()

  image.style.opacity = 0
  image.style.transition = 'opacity 1s ease-in'

  addEvent(image, 'load', function() {
    var imageWidth = image.width,
      imageHeight = image.height

    var displayHeight = (that.colWidth * imageHeight) / imageWidth

    callback(minIndex, image, displayHeight)
  })

  addEvent(image, 'error', function() {
    callback(minIndex, null, 0)
  })

  image.src = src
}

WaterFall.prototype.fetch = function(list) {
  var that = this
  var src = list.shift()

  this.append(src, function() {
    list.length && that._fetch(list)
  })
}

WaterFall.prototype._fetch = function(list) {
  var that = this

  var src = list.shift()

  this.append(src, function() {
    list.length && that._fetch(list)
  })
}

WaterFall.prototype.createLoading = function() {
  var div = document.createElement('div')

  div.innerText = 'loading'

  div.style.borderTop = '5px solid #f5f5f5'
  div.style.width = '100%'
  div.style.height = '48px'
  div.style.lineHeight = '48px'
  div.style.textAlign = 'center'
  div.style.color = '#999'

  this.container.appendChild(div)
}

WaterFall.prototype.visible = function(visibility) {
  this.container.style.display = visibility ? 'block' : 'none'
}

function addEvent(element, event, listener) {
  if (document.addEventListener) {
    if (element && event && listener) {
      element.addEventListener(event, listener, false)
    }
  } else {
    if (element && event && listener) {
      element.attachEvent('on' + event, listener)
    }
  }
}

export default WaterFall
// })
