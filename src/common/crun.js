const EVT_MAP = {}

chrome.runtime.onMessage.addListener(({ event, params }) => {
  const fns = EVT_MAP[event]
  if (fns && fns.length) {
    fns.forEach(fn => { fn(params) })
  }
})

export default {
  $on (event, fn) {
    console.log('on', event)
    const fns = EVT_MAP[event] || (EVT_MAP[event] = [])
    fns.push(fn)
  },

  $off (event, fn) {
    const fns = EVT_MAP[event] || []
    const index = fns.indexOf(fn)
    if (~index) {
      fns.splice(index, 1)
    }
  },

  $emit (event, params) {
    console.log('emit', event)
    return new Promise(resolve => {
      chrome.runtime.sendMessage({ event, params }, resolve)
    })
  }
}
