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
      xml_len: 100,
      reqFrom: 'wap_result'
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
      start: (page - 1) * size,
      xml_len: size
    })
    const queryURL = `${api}?${serialize(params)}`
    return axios.get(queryURL).then(({ data = {} }) => {
      return {
        data: (data.items || []).map(it => it.locImageLink),
        total: data.totalNum || 0
      }
    }, log)
  }
}
