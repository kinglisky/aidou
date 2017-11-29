import crun from '@/common/crun'
import QueryEngine from './queryEngine'
import {
  fetchImgToBase64
  // dataURItoBlob
} from './util'
chrome.extension.sendMessage({
  event: 'one',
  params: {}
})
crun.$on('fetch-expression', params => {
  QueryEngine.sogou(params).then(data => {
    const link = data[0].locImageLink
    fetchImgToBase64(link).then(base64 => {
      chrome.runtime.sendMessage({
        event: 'receive-expression',
        params: { link, base64 }
      })
      // crun.$emit('receive-expression', { link, base64 })
    })
    // data.forEach(({ locImageLink: link }) => {
    //   fetchImgToBase64(link).then(base64 => {
    //     crun.$emit('receive-expression', { link, base64 })
    //   })
    // })
  })
})

// const data = new window.FormData()
// data.append('smfile', dataURItoBlob(base64, 'temp.png'))
// axios.post('https://sm.ms/api/upload', data).then(res => {
//   console.log(res)
// })
