const IFRAME = document.createElement('IFRAME')

IFRAME.style.position = 'fixed'
IFRAME.style.bottom = 0
IFRAME.style.right = 0
IFRAME.style.width = '600px'
IFRAME.style.height = '100%'
IFRAME.style.border = 'none'
IFRAME.style.zIndex = 9999
IFRAME.style.opacity = 0
IFRAME.style.transform = `translate3d(100%, 0, 0)`
IFRAME.style.transition = 'opacity .5s ease-in-out, transform .5s ease-in-out'
IFRAME.src = window.chrome.extension.getURL('content.html')

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

document.body.appendChild(IFRAME)

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

document.addEventListener('keydown', function (event) {
  const { metaKey, shiftKey, key } = event
  if (metaKey && shiftKey && key === '\\') {
    if (visible) {
      hiddenApp()
    } else {
      showApp()
    }
  }
})
