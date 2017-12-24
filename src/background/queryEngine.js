import axios from 'axios'
import swal from 'sweetalert'

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
    },
    HOT_SEARCH: 'https://pic.sogou.com/pic/emo/',
    // 屏蔽掉一些**的热词
    DIRTY_WORD: ['鹿晗'],
    DEFAULT_HOT_WORDS: ['动图', '绿帽子', '王者荣耀', '滑稽表情', '污表情', '比心', '装逼'],
    MATCH: {
      HOT_WORDS_AREA: /<ul class="hotword-list" id="searchHotwordList">([\s\S]*)<\/ul>/,
      KEYWORD: /href="\/pic\/emo\/searchList.jsp\?keyword=([\s\S]*)&statref=home_hotword"/
    }
  }
}

function log (e) {
  swal('嗯，冷静一下~', '查询服务瓦特了...', 'error')
}

export default {
  // 搜狗表情服务
  sogou: {
    search ({ query, page, size }) {
      const api = CONFIG.SOGOU.API
      const defParams = CONFIG.SOGOU.PARAMS
      const params = merge(defParams, {
        query: `${query}`,
        start: (page - 1) * size,
        xml_len: size
      })
      const queryURL = `${api}?${serialize(params)}`
      return axios.get(queryURL).then(({ data = {} }) => {
        return {
          data: (data.items || []).map(it => ({
            link: it.locImageLink,
            suffix: it.type
          })),
          total: data.totalNum || 0
        }
      }, log)
    },

    hotWord () {
      const { HOT_SEARCH, MATCH, DEFAULT_HOT_WORDS, DIRTY_WORD } = CONFIG.SOGOU
      return axios.get(HOT_SEARCH).then(({ data = {} }) => {
        const hotWordArea = String(data).match(MATCH.HOT_WORDS_AREA)
        if (!hotWordArea || !hotWordArea[1]) return []
        const res = []
        hotWordArea[1].trim().split(/<li>|<\/li><li>|<\/li>/)
          .forEach(it => {
            const match = it.match(MATCH.KEYWORD)
            if (match && match[1] && DIRTY_WORD.indexOf(match[1]) === -1) {
              res.push(match[1])
            }
          })
        return res.length ? res : DEFAULT_HOT_WORDS
      }, log)
    }
  }
}
