<template>
  <div class="cpt-expression" @click="buildMarkLink">
    <img v-show="src" :src="src">
    <loading v-show="!src"></loading>
    <span class="collect-btn"
      :class="collectClass"
      @click.stop="updateExpression">
    </span>
  </div>
</template>

<script>
import crun from '@/common/crun'
import copy from '../util/copy'
import bus from '../util/bus'
import Loading from './loading'
import showLinks from './showLinks'
import LINK_BUILDER from '../util/linkBuilder'

const WEIBO_LOGIN = 'http://weibo.com/?topnav=1&mod=logo'

export default {
  props: {
    exp: Object,
  
    mod: {
      type: String,
      default: 'add'
    }
  },

  data () {
    return {
      src: ''
    }
  },

  watch: {
    exp: 'fetchImgData'
  },

  computed: {
    collectClass () {
      const { mod, active } = this
      return {
        'active': mod === 'add' && active,
        'icon-favorite': mod === 'add',
        'icon-delete_forever': mod === 'remove'
      }
    },

    showFullLinks () {
      return this.$root.APP_CONF.showFullLinks
    },

    copyMod () {
      return this.$root.APP_CONF.copyLink || 'markdown'
    },

    usePicBed () {
      const { APP_CONF: { transformUrl }, HOSTNAME } = this.$root
      return ~(transformUrl || '').split(',').indexOf(HOSTNAME)
    },

    active () {
      const { exp, $root: { COLLECT_DATA } } = this
      return COLLECT_DATA[exp ? exp.link : '']
    }
  },

  created () {
    this.fetchImgData()
  },

  methods: {
    fetchImgData () {
      const { link } = this.exp
      if (!link) return
      crun.$emit('url-to-base64', link).then(base64 => {
        this.src = base64
      })
    },

    copyLink (url) {
      copy(url, ok => {
        if (!ok) return
        this.$swal({
          title: '复制成功',
          text: url.slice(0, 30) + '......',
          icon: 'success',
          buttons: false,
          timer: 2000
        })
      })
    },

    fetchMarkLink () {
      return new Promise((resolve, reject) => {
        if (!this.src) return reject()
        if (!this.usePicBed) {
          return resolve(this.exp.link)
        }
        this.$swal('生成图床链接中......', { button: false })
        crun.$emit('uniform-url', this.src).then(({ url, err = '图床服务出错!', server }) => {
          if (!url) {
            this.picBedErrHandler(server, err)
            return reject()
          }
          resolve(url)
        })
      })
    },

    showMarkLink (url) {
      if (!url) return
      if (this.showFullLinks) {
        this.$swal({
          content: showLinks(url),
          buttons: false
        })
      } else {
        const copyLinkBuilder = LINK_BUILDER[this.copyMod]
        const copyUrl = copyLinkBuilder(url)
        this.copyLink(copyUrl)
      }
    },

    buildMarkLink () {
      this.fetchMarkLink().then(this.showMarkLink, () => {})
    },

    picBedErrHandler (server, err) {
      if (server === 'weibo') {
        this.$swal({
          text: `${err}，先登录新微博后重试`,
          icon: 'warning',
          buttons: ['我不登', '好哒']
        }).then(v => {
          if (!v) return
          window.open(WEIBO_LOGIN)
        })
      } else {
        this.$swal({
          text: `emmm... 图床好像挂掉了，换个图床试试`,
          icon: 'warning',
          buttons: true
        })
      }
    },

    updateExpression () {
      const { mod } = this
      if (mod === 'add') {
        this.addExpression()
      } else {
        this.removeExpression()
      }
    },

    addExpression () {
      const { exp } = this
      crun.$emit('add-collect-expression', exp).then(this.updateCollectTip)
    },

    removeExpression () {
      const { exp } = this
      crun.$emit('remove-collect-expression', exp).then(this.updateCollectTip)
    },

    updateCollectTip () {
      const v = this.mod === 'add' ? 1 : -1
      bus.$emit('update-collect-tip', v)
    }
  },

  components: {
    Loading
  }
}
</script>

<style lang="scss">
.cpt-expression {
  position: relative;
  z-index: 100;
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #efefef;
  margin: 20px 0;
  background: #fff;

  cursor: pointer;
  transition: all .2s ease-in;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .collect-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    border: 1px solid #eee;
    border-radius: 2px;
    margin: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    background: #fff;
    color: #aaa;
    font-size: 20px;
    opacity: 0;

    transition: all .2s ease-in-out;

    &:hover,
    &.active {
      color: #4ad9d9;
    }
  }

  &:hover {
    .collect-btn {
      opacity: 1;
    }
  }
}
</style>
