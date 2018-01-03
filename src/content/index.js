const IFRAME = document.createElement('IFRAME')
const HOSTNAME = window.location.hostname
const URL = window.chrome.extension.getURL('content.html') + '?hostname=' + HOSTNAME

IFRAME.style.position = 'fixed'
IFRAME.style.bottom = 0
IFRAME.style.right = 0
IFRAME.style.width = '600px'
IFRAME.style.height = '100%'
IFRAME.style.border = 'none'
IFRAME.style.zIndex = 999999
IFRAME.style.opacity = 0
IFRAME.style.transform = `translate3d(100%, 0, 0)`
IFRAME.style.transition = 'opacity .5s ease-in-out, transform .5s ease-in-out'
IFRAME.src = URL
document.body.appendChild(IFRAME)

// 控制窗口显示隐藏
let visible = false

function showApp () {
  visible = true
  IFRAME.style.opacity = 1
  IFRAME.style.transform = `translate3d(0, 0, 0)`
  chrome.runtime.sendMessage({ event: 'sync-visible', params: true })
}

function hiddenApp () {
  visible = false
  IFRAME.style.opacity = 0
  IFRAME.style.transform = `translate3d(100%, 0, 0)`
  chrome.runtime.sendMessage({ event: 'sync-visible', params: false })
}

let mouseented = false
IFRAME.addEventListener('mouseenter', event => {
  mouseented = true
})
IFRAME.addEventListener('mouseleave', event => {
  mouseented = false
})
document.body.addEventListener('click', event => {
  if (!mouseented) {
    hiddenApp()
  }
})

window.addEventListener('message', event => {
  const { id, value } = event.data || {}
  if (id !== 'chrome-extension-aidou') return
  if (value) {
    showApp()
  } else {
    hiddenApp()
  }
})

// 一些快捷键配置
let config = {
  shortcut: {
    specialKeys: ['metaKey', 'shiftKey'],
    key: '\\'
  }
}

chrome.runtime.sendMessage({
  event: 'get-config',
  params: config
}, conf => { config = conf })

chrome.runtime.onMessage.addListener(({ event, params }) => {
  if (event === 'update-config') {
    config = params
  }
})

let kbTimer = null
document.addEventListener('keydown', function (event) {
  if (!config || !config.shortcut) return
  if (kbTimer) {
    clearTimeout(kbTimer)
    kbTimer = null
    return
  }
  kbTimer = setTimeout(() => {
    const { specialKeys = [], key = '', code = '' } = config.shortcut
    if (
      specialKeys.every(k => event[k]) &&
      ((code && code === event.code) || (key && key === event.key))
    ) {
      if (visible) {
        hiddenApp()
      } else {
        showApp()
      }
    }
    kbTimer = null
  }, 200)
})
