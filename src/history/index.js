History.addHistory = function(url) {
  var stateObj = {
    foo: 'bar'
  }

  window.history.pushState(stateObj, 'page 2', url)
}

export default History
