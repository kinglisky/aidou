// var url = 'https://pic.sogou.com/pics/json.jsp?query=bug%20%E8%A1%A8%E6%83%85&st=5&start=0&xml_len=100&callback=dataCallback&reqFrom=wap_result&'
var url = '//pic.sogou.com/pics/json.jsp?query=bug%20%E8%A1%A8%E6%83%85&st=5&start=0&xml_len=100'

fetch(url, {
  'mode': 'cors'
})
.then(res => res.text())
.then(json => {
  // console.log(JSON.parse(json.slice(13).slice(0, -2)))
  // console.log(JSON.parse(json).items)
  console.log(JSON.stringify(JSON.parse(json).items[0]))
})

// var a = document.createElement('a')
// var filename = 'emo.gif'
// a.href = 'http://i01.pic.sogou.com/ad351e0aaa645000'
// a.download = filename
// a.click()

// fetch('https://fabiaoqing.com/search/search/keyword/bug')
// .then(res => res.text())
// .then(text => {
//   console.log(text.match(/data-original="http:.*\.\w+"/g).map(it => {
//     return it.replace(/data-original="(.*)"/, '$1')
//   }).slice(1))
// })