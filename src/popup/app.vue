<template>
  <section id="chrome-extension-aidou">
    <app-header @fetch-exp="fetchExp" :view.sync="currView"></app-header>
    <transition-group name="panels" tag="div" class="app-wrapper">
      <search-panel
        class="view"
        key="search"
        :query="query"
        v-show="view.search">
      </search-panel>
      <collect-panel
        class="view"
        key="collect"
        v-show="view.collect">
      </collect-panel>
      <config-panel
        class="view"
        key="config"
        v-show="view.config">
      </config-panel>
    </transition-group>
  </section>
</template>

<script>
import AppHeader from './components/app-header'
import SearchPanel from './components/search-panel'
import ConfigPanel from './components/config-panel'
import CollectPanel from './components/collect-panel'

export default {
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
  width: 500px;
  height: 600px;
  overflow: hidden;
}

body {
  overflow: hidden;
  font-size: 12px;
}

ul {
  list-style: none;
}

.common-input {
  padding: 4px 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
}

.common-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  transition: opacity .2s;
  cursor: pointer;

  &.confirm {
    color: #fff;
    background: #4ad9d9;
  }

  &.cancel {
    background: #ccc;
  }

  &:hover {
    opacity: .8;
  }
}

#chrome-extension-aidou {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  color: #3e5165;
  font-weight: 200;
  background: #fff;

  .app-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;

    .view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }

  .panels-enter-active,
  .panels-leave-active {
    transition: opacity .8s, transform .8s;
  }
  .panels-enter,
  .panels-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
