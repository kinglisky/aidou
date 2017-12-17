<template>
  <section id="chrome-extension-aidou">
    <app-header @fetch-exp="fetchExp"></app-header>
    <expression-list
      :data="data"
      :total="total"
      :page.sync="page"
      :loading="loading">
    </expression-list>
    <span class="icon-close close-btn" @click="toggleView(false)"></span>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import crun from '@/common/crun'
import AppHeader from './components/app-header'
import ExpressionList from './components/expression-list'
export default {
  data () {
    return {
      query: '',
      data: [],
      size: 10,
      page: 1,
      total: 0,
      loading: false
    }
  },

  computed: {
    params () {
      const { query, page, size } = this
      return { query, page, size }
    }
  },

  watch: {
    query: 'reset',
    params: {
      deep: true,
      handler: 'fetchExpression'
    }
  },

  created () {
    crun.$on('show-app', this.toggleView)
  },

  methods: {
    fetchExp (v) {
      this.query = v
    },

    reset () {
      this.data = []
      this.page = 1
      this.total = 0
    },

    fetchExpression () {
      if (!this.query) return
      this.loading = true
      crun.$emit('fetch-expression', this.params)
        .then(this.receiveExpression)
    },

    receiveExpression ({ data = [], total = 0 }) {
      this.loading = false
      this.total = total
      this.data = this.data.concat(data)
    },

    toggleView (visible) {
      window.parent.postMessage({
        id: 'chrome-extension-aidou',
        value: visible
      }, '*')
    }
  },

  components: {
    AppHeader,
    ExpressionList
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

