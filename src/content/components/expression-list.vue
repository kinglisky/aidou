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
      page: 1,
      tatal: 0
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
      this.tatal = 0
    },

    fetchExpression () {
      if (!this.query) return
      crun.$emit('fetch-expression', this.params)
        .then(this.receiveExpression)
    },

    receiveExpression ({ data = [], tatal = 0 }) {
      this.tatal = tatal
      this.data = this.data.concat(data)
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


