<template>
  <div class="cpt-expression-list">
    <expression v-for="url in data" :key="url" :url="url"></expression>
  </div>
</template>

<script>
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
      page: 1
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

  mounted () {
  },

  methods: {
    reset () {
      this.data = []
      this.page = 1
    },

    fetchExpression () {
      if (!this.query) return
      chrome.runtime.sendMessage({
        event: 'fetch-expression',
        params: this.params
      })
      // crun.$emit('fetch-expression', this.params)
    },

    receiveExpression (it) {
      console.log(it)
      // this.data.push(it)
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


