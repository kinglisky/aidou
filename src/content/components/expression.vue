<template>
  <div class="cpt-expression" @click="fetchMarkUrk">
    <img :src="src">
  </div>
</template>

<script>
import crun from '@/common/crun'
import copy from './copy'
import LoadImg from './loading.gif'
export default {
  props: {
    url: String
  },

  data () {
    return {
      src: LoadImg
    }
  },

  watch: {
    url: 'fetchImgData'
  },

  created () {
    this.fetchImgData()
  },

  methods: {
    fetchImgData () {
      if (!this.url) return
      crun.$emit('url-to-base64', this.url).then(base64 => {
        this.src = base64
      })
    },

    fetchMarkUrk () {
      if (!this.src) return
      crun.$emit('uniform-url', this.src).then(url => {
        const mdUrl = `![](${url})`
        copy(mdUrl, ok => {
          if (ok) {
            this.$swal({
              title: '复制成功',
              text: mdUrl
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.cpt-expression {
  position: relative;
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 20px 0;
  z-index: 100;
  cursor: pointer;
  border: 1px solid #eee;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

