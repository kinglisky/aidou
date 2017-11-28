import Vue from 'vue'
import App from './app.vue'

const Cus = Vue.extend(App)

const app = new Cus().$mount()

document.body.appendChild(app.$el)
