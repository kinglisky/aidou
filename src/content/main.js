import Vue from 'vue'
import App from './app.vue'
import swal from 'sweetalert'

Vue.prototype.$swal = swal

new Vue({
  el: '#app',
  render: h => h(App)
})
