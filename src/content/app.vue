<template>
  <section id="chrome-extension-aidou">
    <app-header @fetch-exp="fetchExp" :view.sync="currView"></app-header>
    <div class="app-wrapper">
      <search-panel class="view" v-show="view.search" :query="query"></search-panel>
      <collect-panel class="view" v-show="view.collect"></collect-panel>
      <config-panel class="view" v-show="view.config"></config-panel>
    </div>
    <span class="icon-close close-btn" @click="toggleView(false)"></span>
  </section>
</template>

<script>
import AppHeader from './components/app-header'
import SearchPanel from './components/search-panel'
import ConfigPanel from './components/config-panel'
import CollectPanel from './components/collect-panel'
import toggleView from './mixins/toggleView'

export default {
  mixins: [toggleView],

  data () {
    return {
      query: '',
      currView: 'search'
    }
  },

  computed: {
    view () {
      const { currView } = this
      return {
        search: currView === 'search',
        collect: currView === 'collect',
        config: currView === 'config'
      }
    }
  },

  methods: {
    fetchExp (v) {
      this.query = v
    },
  },

  components: {
    AppHeader,
    ConfigPanel,
    SearchPanel,
    CollectPanel
  }
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  font-size: 12px;
}

#chrome-extension-aidou {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 40px 50px 40px 60px;
  border-left: 1px solid #ebebeb;
  background: #fff;
  color: #3e5165;
  font-weight: 200;

  .app-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;

    .view {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .close-btn {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    color: #929aa3;
    font-size: 14px;

    cursor: pointer;
    transition: color .2s ease-in;

    &:hover {
      color: #55b559;
    }
  }
}
</style>

