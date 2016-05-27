import {string, element} from 'deku'
import App from './src/components/app'

const html = string.render(element(App))
console.log(html)
