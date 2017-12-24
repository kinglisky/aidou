<template>
  <section class="cpt-app-header">
    <div class="search-input">
      <span class="icon-search"></span>
      <input v-model.trim="keyword"
        @keyup.enter="fetchExp"
        @focus="showView('search')">
    </div>
    <ul class="oper-btns">
      <li v-for="btn in btnList"
        :key="btn.text" class="btn" 
        @click="btn.handler">
        <span class="icon" :class="btn.icon"></span>
        <span class="text">{{ btn.text }}</span>
        <span v-show="btn.tip" class="tip-text" >{{ btn.tip }}</span>
      </li>
    </ul>
  </section>
</template>


<script>
import crun from '@/common/crun'
import bus from '../util/bus'
export default {
  props: {
    view: {
      type: String,
      default: 'search'
    }
  },

  data () {
    return {
      keyword: '',
      hotWord: '',
      hotWords: [],
      tipMod: 0
    }
  },

  computed: {
    syncView: {
      get () {
        return this.view
      },

      set (v) {
        this.$emit('update:view', v)
      }
    },

    tipText () {
      const { tipMod } = this
      if (!tipMod) return
      return tipMod > 0 ? '+ 1' : '- 1'
    },

    btnList () {
      const { shuffleSeach, shwoCollect, showConfig, tipText } = this
      return [
        {
          icon: 'icon-shuffle',
          text: '随便看看',
          handler: shuffleSeach
        },
        {
          icon: 'icon-favorite_border',
          text: '我的收藏',
          tip: tipText,
          handler: shwoCollect
        },
        {
          icon: 'icon-settings',
          text: '设置',
          handler: showConfig
        }
      ]
    }
  },

  created () {
    this.fetchHoTword()
    bus.$on('update-collect-tip', this.updateCollectTip)
  },

  beforeDestroy () {
    bus.$off('update-collect-tip', this.updateCollectTip)
  },

  methods: {
    updateCollectTip (v) {
      this.tipMod = v
      setTimeout(() => {
        this.tipMod = 0
      }, 600)
    },

    fetchHoTword () {
      crun.$emit('get-hot-words').then(words => {
        this.hotWords = words
      })
    },

    shuffleSeach () {
      const { hotWords } = this
      const keyword = hotWords[(Math.random() * hotWords.length | 0)]
      if (!keyword) return
      if (this.hotWord === keyword) {
        this.shuffleSeach()
      }
      this.hotWord = keyword
      this.$emit('fetch-exp', `${keyword}&statref=home_hotword`)
    },

    showView (view) {
      const { syncView } = this
      if (syncView !== view) {
        this.syncView = view
      } else {
        this.syncView = 'search'
      }
    },

    showConfig () {
      this.showView('config')
    },

    shwoCollect () {
      this.showView('collect')
    },

    fetchExp () {
      if (!this.keyword) return
      this.$emit('fetch-exp', `${this.keyword} 表情`)
    }
  }
}
</script>

<style lang="scss">
.cpt-app-header {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 40px;
  margin-bottom: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, .1);
  background: #fff;

  $main-color: #929aa3;

  .search-input {
    display: flex;
    align-items: center;
    flex: 3;

    input {
      display: block;
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 500;

      appearance: none;
    }

    .icon-search {
      padding: 10px;
      color: $main-color;
      font-size: 16px;
      vertical-align: middle;
    }
  }

  .oper-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 100%;

    list-style: none;

    .btn {
      position: relative;
      height: 100%;
      color: $main-color;

      .icon {
        font-size: 16px;
        vertical-align: middle;

        cursor: pointer;
      }

      .text,
      .tip-text {
        position: absolute;
        top: 0;
        left: 50%;
        width: 70px;
        padding: 4px 0;
        border-radius: 40px;
        font-size: 10px;
        text-align: center;

        &:after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 50%;
          border-top: 4px solid $main-color;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;

          transform: translateX(-50%);
        }
      }

      .text {
        background: $main-color;
        color: #fff;
        opacity: 0;
        transform: translate3d(-50%, -100%, 0);
        transition: opacity .2s ease-in-out, transform .2s ease-in-out;
      }

      .tip-text {
        background: #4ad9d9;
        color: #fff;
        font-size: 12px;
        animation: popup .2s 1 linear;
        transform: translate3d(-50%, -120%, 0);


        &:after {
          border-top-color: #4ad9d9;
        }

        @keyframes popup {
          0% {
            opacity: 0;

            transform: translate3d(-50%, -100%, 0);
          }

          50% {
            opacity: .5;
          }

          100% {
            opacity: 1;

            transform: translate3d(-50%, -120%, 0);
          }
        }
      }

      &:hover {
        color: #4ad9d9;

        .text {
          opacity: 1;

          transform: translate3d(-50%, -120%, 0);
        }
      }
    }
  }
}
</style>

