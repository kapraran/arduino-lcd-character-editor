import Vue from 'vue'
import App from './views/App.vue'

import './index.scss'

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

new Vue({ render: (createElement) => createElement(App) }).$mount(root)
