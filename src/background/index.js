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
cstore.sync('config', conf => {
  CONFIG = conf || merge(config)
  crun.$emit('update-config', CONFIG)
})

let COLLECT_DATA = {}
cstore.sync('collectData', collectData => {
  COLLECT_DATA = collectData || {}
  crun.$emit('update-collect-data', COLLECT_DATA)
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

// 获取配置信息
crun.$on('fetch-config', (config, cb) => {
  cstore.get({ config }).then(res => cb(res.config))
})

// 更新配置信息
crun.$on('update-config', (config, cb) => {
  cstore.set({ config }).then(res => cb(config))
})

// 收藏相关
crun.$on('add-collect-expression', (exp, cb) => {
  const date = COLLECT_DATA[exp.link] = Date.now()
  cstore.set({
    collectData: COLLECT_DATA
  }).then(() => cb(date))
})

crun.$on('remove-collect-expression', (exp, cb) => {
  const date = COLLECT_DATA[exp.link]
  delete COLLECT_DATA[exp.link]
  cstore.set({
    collectData: COLLECT_DATA
  }).then(() => cb(date))
})

crun.$on('fetch-collect-data', (_, cb) => {
  cstore.get({ collectData: {} }).then(res => cb(res.collectData))
})
