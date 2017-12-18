import crun from '@/common/crun'
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
  }
}
