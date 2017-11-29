import axios from 'axios'

import {
  merge,
  serialize
} from './util'

const CONFIG = {
  SOGOU: {
    API: 'https://pic.sogou.com/pics/json.jsp',
    PARAMS: {
      query: '',
      st: 5,
      start: 0,
      xml_len: 100
    }
  }
}

function log (e) {
  console.log(e)
}

export default {
  sogou ({ query, page, size }) {
    const api = CONFIG.SOGOU.API
    const defParams = CONFIG.SOGOU.PARAMS
    const params = merge(defParams, {
      query: `${query} 表情`,
      start: (size - 1) * page,
      xml_len: size
    })
    const queryURL = `${api}?${serialize(params)}`
    return axios.get(queryURL).then(({ data }) => {
      return data && data.items || []
    }, log)
  }
}
