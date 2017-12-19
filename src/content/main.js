import Vue from 'vue'
import App from './app.vue'
import swal from 'sweetalert'
import config from '@/common/config'
import crun from '@/common/crun'
import '../style/style.css'

Vue.prototype.$swal = swal

const app = new Vue({
  el: '#app',
  data () {
    return {
      appConf: null
    }
  },
  render: h => h(App)
})

// 将配置放在根实例上，用于共享组件内部恭喜
crun.$emit('get-config', config).then(conf => {
  app.appConf = conf
})
