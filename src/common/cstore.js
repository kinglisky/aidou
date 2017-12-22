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

  sync (query, fn) {
    chrome.storage.sync.get(query, res => {
      fn(res[query])
    })
    chrome.storage.onChanged.addListener(data => {
      if (data[query]) {
        fn(data[query].newValue)
      }
    })
  }
}
