import { h, render } from 'preact'
import App from '../../src/pages/index/app.jsx'

let root
function bootstrap() {
  root = render(<App />, document.getElementById('app'), root)
}

bootstrap()
