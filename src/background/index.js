import crun from '@/common/crun'
import cstore from '@/common/cstore'
import config from '@/common/config'
import QueryEngine from './queryEngine'
import PicBed from './picBed'
import {
  merge,
  fetchImgToBase64
} from './util'

let CONFIG = merge(config)

function initConfig () {
  cstore.get(config).then(cfg => {
    CONFIG = cfg
    crun.$emit('update-config', CONFIG, true)
  })
}

initConfig()

cstore.update(initConfig)

// 点击窗口图标打开窗口
chrome.browserAction.onClicked.addListener(tab => {
  crun.$emit('show-app', true, true)
})

// 打开配置页面
// crun.$on('open-option-page', (params, cb) => {
//   chrome.windows.create({
//     url: 'options.html',
//     focused: true,
//     type: 'normal'
//   })
// })

crun.$on('fetch-expression', (params, cb) => {
  QueryEngine.sogou(params).then(cb)
})

crun.$on('url-to-base64', (url, cb) => {
  fetchImgToBase64(url).then(cb)
})

crun.$on('uniform-url', (base64, cb) => {
  PicBed[CONFIG.picBed](base64).then(cb)
})

crun.$on('update-config', (config, cb) => {
  cstore.set(config).then(cb)
})

crun.$on('get-config', (query, cb) => {
  cstore.get(query).then(cb)
})
