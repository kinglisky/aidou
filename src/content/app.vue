<template>
  <section id="chrome-extension-aidou">
    <app-header @fetch-exp="fetchExp"></app-header>
    <expression-list
      :data="data"
      :total="total"
      :page.sync="page"
      :loading="loading">
    </expression-list>
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
}

#chrome-extension-aidou {
  $border-color: #ebebeb;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  color: #3e5165;
  border-left: 1px solid $border-color;
  background: #fff;
  font-weight: 200;
}
</style>

