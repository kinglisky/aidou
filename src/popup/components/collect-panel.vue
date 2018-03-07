<template>
  <expression-list
    mod="remove"
    :data="data"
    :total="data.length"
    :loading="false">
  </expression-list>
</template>

<script>
import ExpressionList from './expression-list'
import crun from '@/common/crun'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
  },

  computed: {
    data () {
      const collectData = this.$root.COLLECT_DATA || {}
      return Object.keys(collectData).map(link => {
        return { link, suffix: '.jpg' }
      })
    }
  },

  components: {
    ExpressionList
  }
}
</script>
