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
      APP_CONF: null,
      COLLECT_DATA: {}
    }
  },
  render: h => h(App)
})

// 将配置放在根实例上，用于共享组件内部恭喜
crun.$emit('get-config', config).then(conf => {
  app.APP_CONF = conf
})

// 收藏图标数据
const updateCollectData = data => { app.COLLECT_DATA = data }
crun.$on('collect-data-update', updateCollectData)
crun.$emit('get-collect-data').then(updateCollectData)
