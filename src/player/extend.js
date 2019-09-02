// ;(function(global, factory) {
//   if (typeof exports === 'object' && typeof module === 'object') {
//     module.exports = factory()
//   } else if (typeof define === 'function' && define.amd) {
//     define([], factory())
//   } else if (typeof exports === 'object') {
//     exports['extend'] = factory()
//   } else {
//     global['extend'] = factory()
//   }
// })(this, function() {
function isFunction(v) {
  return 'function' === typeof v
}

function isPlainObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

function isArray(v) {
  return Array.isArray
    ? Array.isArray(v)
    : Object.prototype.toString.call(v) === '[object Array]'
}

function extend() {
  var clone
  var options
  var name
  var copy
  var deep = false

  var src

  var copyIsArray

  var target = arguments[0] || {}

  var i = 1

  var length = arguments.length

  if (typeof target === 'boolean') {
    deep = target

    target = arguments[i] || {}

    i++
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        copy = options[name]

        if (name === '__proto__' || target === copy) {
          continue
        }

        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = isArray(copy)))
        ) {
          src = target[name]

          if (copyIsArray && isArray(src)) {
            clone = []
          } else if (!copyIsArray && !isPlainObject(src)) {
            clone = {}
          } else {
            clone = src
          }

          copyIsArray = false

          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export default extend
// })
