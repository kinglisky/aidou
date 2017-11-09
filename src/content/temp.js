// var url = 'https://pic.sogou.com/pics/json.jsp?query=bug%20%E8%A1%A8%E6%83%85&st=5&start=0&xml_len=100&callback=dataCallback&reqFrom=wap_result&'

const API = '//pic.sogou.com/pics/json.jsp'
const DEFAULT_PARAMS = {
  query: 'bug 表情',
  st: 5,
  start: 0,
  xml_len: 100
}

function serialize (params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

const fetchImgToBase64 = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

const queryURL = `${API}?${serialize(DEFAULT_PARAMS)}`
console.log('queryURL', queryURL)
fetch(queryURL)
.then(res => res.json())
.then(json => {
  const head = json.items[0]
  const imgLink = head.locImageLink
  const imgType = head.type
  // const img = document.createElement('img')
  // document.body.appendChild(img)
  // img.src = imgLink
  console.log(imgLink, imgType)

  fetchImgToBase64(imgLink).then(base64 => console.log(base64))
})
