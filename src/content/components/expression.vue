<template>
  <div class="cpt-expression" @click="fetchMarkUrk">
    <img v-show="src" :src="src">
    <loading v-show="!src"></loading>
  </div>
</template>

<script>
import crun from '@/common/crun'
import copy from './copy'
import Loading from './loading'
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
      this.$swal('生成图床链接......', { button: false })
      crun.$emit('uniform-url', this.src).then(url => {
        const mdUrl = `![](${url})`
        copy(mdUrl, ok => {
          if (!ok) return
          this.$swal({
            title: '复制成功',
            text: mdUrl,
            icon: 'success',
            buttons: false,
            timer: 2000
          })
        })
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
  margin: 20px 0;

  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
