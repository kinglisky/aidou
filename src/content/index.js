const iframe = document.createElement('iframe')
iframe.style.position = 'fixed'
iframe.style.bottom = 0
iframe.style.right = 0
iframe.style.width = '600px'
iframe.style.height = '100%'
iframe.style.border = 'none'
iframe.style.zIndex = 9999
iframe.src = window.chrome.extension.getURL('content.html')
document.body.appendChild(iframe)
