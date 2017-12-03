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
        copy(`![](${url})`)
      })
    }
  }
}
</script>

<style lang="scss">
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: .3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
.cpt-expression {
  position: relative;
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 20px 0;
  z-index: 100;
  border: 1px solid #eee;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate3d(-50%, -50%, 0);
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: 0.1s * $i;
        background: #3ac;
      }
    }
  }

  @keyframes slide {
    0% {
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>

