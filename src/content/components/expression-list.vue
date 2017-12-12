<template>
  <div class="cpt-expression-list" @scroll="requestExpression">
    <expression v-for="exp in data" :key="exp.link" :exp="exp"></expression>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import Expression from './expression'
import crun from '@/common/crun'

export default {
  props: {
    query: String
  },

  data () {
    return {
      data: [],
      size: 50,
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
    reset () {
      this.data = []
      this.page = 1
      this.total = 0
    },

    requestExpression: debounce(function ({ target }) {
      const { data, total, loading } = this
      if (data.length === total || loading) return
      const { scrollHeight, offsetHeight, scrollTop } = target
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.page += 1
      }
    }, 400),

    fetchExpression () {
      if (!this.query) return
      crun.$emit('fetch-expression', this.params)
        .then(this.receiveExpression)
    },

    receiveExpression ({ data = [], total = 0 }) {
      this.total = total
      this.data = this.data.concat(data)
      this.loading = false
    }
  },

  components: {
    Expression
  }
}
</script>

<style lang="scss">
.cpt-expression-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
}
</style>


