const EVT_MAP = {}

chrome.runtime.onMessage.addListener(({ event, params }, sender, sendResponse) => {
  const fn = EVT_MAP[event]
  if (fn) {
    fn(params, sendResponse)
  }
  return true
})

export default {
  $on (event, fn) {
    EVT_MAP[event] = fn
  },

  $off (event) {
    delete EVT_MAP[event]
  },

  $emit (event, params, inBg) {
    return new Promise(resolve => {
      if (inBg) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
          const activeId = tabs[0] ? tabs[0].id : ''
          if (activeId) {
            chrome.tabs.sendMessage(activeId, { event, params }, resolve)
          }
        })
      } else {
        chrome.runtime.sendMessage({ event, params }, resolve)
      }
    })
  }
}
