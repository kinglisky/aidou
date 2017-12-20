<template>
  <div class="cpt-expression" @click="fetchMarkUrk">
    <img v-show="src" :src="src">
    <loading v-show="!src"></loading>
    <span
      class="collect-btn icon-favorite"
      @click.stop="updateExpression">
    </span>
  </div>
</template>

<script>
import crun from '@/common/crun'
import copy from '../util/copy'
import Loading from './loading'
import showLinks from './showLinks'

export default {
  props: {
    exp: Object
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
    showFullLinks () {
      return this.$root.appConf.showFullLinks
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

    fetchMarkUrk () {
      if (!this.src) return
      this.$swal('生成图床链接中......', { button: false })
      crun.$emit('uniform-url', this.src).then(({ url, err = '图床服务出错!', server }) => {
        if (!url) {
          return this.picBedErrHandler(server, err)
        }
        if (this.showFullLinks) {
          this.$swal({
            content: showLinks(url),
            buttons: false
          })
        } else {
          const mdUrl = `![](${url})`
          copy(mdUrl, ok => {
            if (!ok) return
            this.$swal({
              title: '复制成功',
              text: mdUrl.slice(0, 30) + '......',
              icon: 'success',
              buttons: false,
              timer: 2000
            })
          })
        }
      })
    },

    picBedErrHandler (server, err) {
      if (server === 'weibo') {
        this.$swal({
          text: `${err}，先登录新微博后重试`,
          icon: 'warning',
          buttons: true
          }).then(v => {
            if (!v) return
             window.open('http://weibo.com/?topnav=1&mod=logo')
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
      const { exp } = this
      crun.$emit('collect-expression', exp).then(res => {
        console.log('收藏成功')
      })
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
    border-radius: 2px;
    margin: 10px;
    border: 1px solid #eee;
    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
    background: #fff;
    color: #aaa;
    font-size: 20px;
    opacity: 0;

    transition: all .2s ease-in-out;

    &:hover {
      color: #f2385a;
    }
  }

  &:hover {
    .collect-btn {
      opacity: 1;
    }
  }
}
</style>
