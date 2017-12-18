<template>
  <section id="chrome-extension-aidou">
    <app-header @fetch-exp="fetchExp"></app-header>
    <expression-list
      :data="data"
      :total="total"
      :page.sync="page"
      :loading="loading">
    </expression-list>
    <config></config>
    <span class="icon-close close-btn" @click="toggleView(false)"></span>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import AppHeader from './components/app-header'
import ExpressionList from './components/expression-list'
import Config from './components/config'
import toggleView from './mixins/toggleView'
import fetchExpression from './mixins/fetchExpression'

export default {
  mixins: [toggleView, fetchExpression],

  data () {
    return {
    }
  },

  components: {
    AppHeader,
    ExpressionList,
    Config,
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

