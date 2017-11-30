import axios from 'axios'
import { dataURItoBlob } from './util'

const CONFIG = {
  SM: {
    API: 'https://sm.ms/api/upload'
  }

}

export default {
  sm (base64) {
    return new Promise(resolve => {
      const data = new window.FormData()
      const api = CONFIG.SM.API
      data.append('smfile', dataURItoBlob(base64, 'temp.png'))
      axios.post(api, data).then(({ data }) => {
        const { data: res } = data
        resolve(res.url)
      })
    })
  }
}
