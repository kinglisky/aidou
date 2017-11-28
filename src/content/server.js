export function fetchExpression (params) {
  return Promise(resolve => {
    chrome.runtime.sendMessage({
      type: 'fetchExpression',
      params
    }, resolve)
  })
}
