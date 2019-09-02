import extend from './extend.js'

function Player(opts) {
  this.opts = extend(true, this.constructor.defaultOptions, opts || {})

  this.src = this.opts.src
  this.poster = this.opts.poster

  this.container =
    typeof this.opts.container === 'string'
      ? document.getElementById(this.opts.container)
      : this.opts.container

  this.init()
}

Player.defaultOptions = {
  container: 'player'
}

Player.prototype.init = function() {
  this.container.style.display = 'none'

  var videoPlayerContainer = `<div class="sfa-content">
      <div class="sfc-video-page-vertical launchscreen">
        <div class="sfc-video-page-vertical-container">
          <div class="sfc-video-page-vertical-player-container">
            <div id="videoPlayerContainer" class="sfc-video-page-vertical-player-bplayer"></div>
          </div>
        </div>
      </div>
    </div>`

  this.container.innerHTML = videoPlayerContainer
}

Player.prototype.visible = function(visibility) {
  this.container.style.display = visibility ? 'block' : 'none'
}

Player.prototype.createVideo = function(opts) {
  var videoPlayerContainer = document.getElementById('videoPlayerContainer')

  var video = document.createElement('video')

  var attrs = {
    class: 'b-player-video',
    type: 'video/mp4',
    poster: opts.poster,
    preload: 'none',
    height: '100%',
    autoplay: 'true',
    'webkit-playsinline': 'true',
    playsinline: 'true',
    'x-webkit-airplay': 'true',
    't7-video-player-type': 'inline',
    loop: ''
  }

  for (var name in attrs) {
    Object.prototype.hasOwnProperty.call(attrs, name) &&
      video.setAttribute(name, attrs[name])
  }

  var source = document.createElement('source')

  source.setAttribute('src', opts.src)

  video.appendChild(source)

  videoPlayerContainer.appendChild(video)

  this.videoPlayerContainer = videoPlayerContainer
}

Player.prototype.destroy = function() {
  this.container.style.display = 'none'

  this.videoPlayerContainer.innerHTML = ''
}

export default Player
