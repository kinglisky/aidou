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
let COLLECT_DATA = {}

cstore.sync('config', conf => {
  CONFIG = conf || merge(config)
})

cstore.sync('collectData', collectData => {
  COLLECT_DATA = collectData || {}
  crun.$emit('collect-data-update', COLLECT_DATA, true)
})

// 点击窗口图标打开窗口
let VISIBLE = false
chrome.browserAction.onClicked.addListener(tab => {
  crun.$emit('show-app', !VISIBLE, true)
})

// 同步显隐
crun.$on('sync-visible', (visible, cb) => {
  VISIBLE = visible
})

// 获取表情列表
crun.$on('fetch-expression', (params, cb) => {
  QueryEngine.sogou(params).then(cb)
})

// 图片链接转为 base64
crun.$on('url-to-base64', (url, cb) => {
  fetchImgToBase64(url).then(cb)
})

// 上传至图床服务生产图片外链链接
crun.$on('uniform-url', (base64, cb) => {
  PicBed[CONFIG.picBed](base64).then(cb)
})

crun.$on('get-config', (config, cb) => {
  cstore.get({ config }).then(res => cb(res.config))
})

crun.$on('update-config', (config, cb) => {
  cstore.set({ config }).then(res => cb(config))
})

crun.$on('collect-expression', (exp, cb) => {
  const date = COLLECT_DATA[exp.link] = Date.now()
  cstore.set({ collectData: COLLECT_DATA }).then(() => cb(date))
})

crun.$on('get-collect-data', (_, cb) => {
  cstore.get({ collectData: {} }).then(res => cb(res.collectData))
})
