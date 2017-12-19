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
      </li>
    </ul>
  </section>
</template>


<script>
import crun from '@/common/crun'

export default {
  props: {
    view: {
      type: String,
      default: 'search'
    }
  },

  data () {
    return {
      keyword: ''
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

    btnList () {
      const { noop, shwoCollect, showConfig} = this
      return [
        {
          icon: 'icon-shuffle',
          text: '随便看看',
          handler: noop
        },
        {
          icon: 'icon-favorite_border',
          text: '我的收藏',
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

  methods: {
    noop () {
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
      this.$emit('fetch-exp', this.keyword)
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
      // display: flex;
      // align-items: center;

      .icon {
        font-size: 16px;
        vertical-align: middle;

        cursor: pointer;
      }

      .text {
        position: absolute;
        top: 0;
        left: 50%;
        width: 70px;
        padding: 4px 0;
        border-radius: 40px;
        background: $main-color;
        color: #fff;
        font-size: 10px;
        text-align: center;
        opacity: 0;

        transform: translate3d(-50%, -100%, 0);
        transition: opacity .2s ease-in-out, transform .2s ease-in-out;

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

      &:hover {
        color: #dc602e;

        .text {
          opacity: 1;

          transform: translate3d(-50%, -120%, 0);
        }
      }
    }
  }
}
</style>

