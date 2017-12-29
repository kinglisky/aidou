import Vue from 'vue'
import App from './app.vue'
import swal from 'sweetalert'
import config from '@/common/config'
import crun from '@/common/crun'
import '../style/style.css'

Vue.prototype.$swal = swal

const APP = new Vue({
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
const updateConfig = conf => { APP.APP_CONF = conf }
crun.$emit('fetch-config', config).then(updateConfig)

// 收藏图标数据
const updateCollectData = data => { APP.COLLECT_DATA = data }
crun.$emit('fetch-collect-data').then(updateCollectData)
crun.$on('update-collect-data', updateCollectData)
