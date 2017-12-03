const iframe = document.createElement('iframe')
iframe.style.position = 'fixed'
iframe.style.bottom = 0
iframe.style.right = 0
iframe.style.width = '600px'
iframe.style.height = '400px'
iframe.style.border = 'none'
iframe.src = window.chrome.extension.getURL('content.html')
document.body.appendChild(iframe)
