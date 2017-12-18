export default {
  get (query) {
    return new Promise(resolve => {
      chrome.storage.sync.get(query, res => {
        resolve(res)
      })
    })
  },

  set (value) {
    return new Promise(resolve => {
      chrome.storage.sync.set(value, resolve)
    })
  },

  update (fn) {
    chrome.storage.onChanged.addListener(fn)
  }
}
