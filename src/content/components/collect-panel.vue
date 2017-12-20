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
      collectData: {}
    }
  },

  computed: {
    data () {
      const { collectData } = this
      return Object.keys(collectData).map(link => {
        return {
          link,
          suffix: '.jpg'
        }
      })
    }
  },

  watch: {
  
  },

  created () {
    crun.$emit('get-collect-data').then(this.initCollectData)
  },
  
  beforeDestroy () {
    crun.$off('get-collect-data').then(this.initCollectData)
  },

  methods: {
    initCollectData (data) {
      console.log(data)
      this.collectData = data
    },
  },

  components: {
    ExpressionList
  }
}
</script>
