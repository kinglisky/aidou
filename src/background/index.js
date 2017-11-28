import axios from 'axios'
import { API, DEFAULT_PARAMS } from './config'
import {
  serialize,
  fetchImgToBase64
  // dataURItoBlob
} from './util'

const queryURL = `${API}?${serialize(DEFAULT_PARAMS)}`

chrome.runtime.onMessage.addListener(function (evt, sender, sendResponse) {
  const { type } = evt
  if (type === 'fetchImg') {
    axios.get(queryURL).then(({ data }) => {
      const imgRes = data.items.map(it => {
        return fetchImgToBase64(it.locImageLink).then(base64 => {
          return {
            base64,
            link: it.locImageLink
          }
        })
      })
      Promise.all(imgRes).then(res => {
        console.log(res[0], res.length)
        sendResponse(res[0])
      })
    })
  }
  return true
})

// const data = new window.FormData()
// data.append('smfile', dataURItoBlob(base64, 'temp.png'))
// axios.post('https://sm.ms/api/upload', data).then(res => {
//   console.log(res)
// })
