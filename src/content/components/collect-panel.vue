<template>
  <expression-list
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
  data () {
    return {
      data: [],
      total: 0
    }
  },

  computed: {
  },

  watch: {
  
  },

  created () {
    
  },

  methods: {
    fetchCollect () {

    },
  },

  components: {
    ExpressionList
  }
}
</script>
