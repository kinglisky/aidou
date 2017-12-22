<template>
  <expression-list
    mod="collect"
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
    crun.$on('collect-data-update', this.updateCollectData)
    this.fetchCollectData()
  },

  beforeDestroy () {
    crun.$off('collect-data-update', this.updateCollectData)
  },

  methods: {
    fetchCollectData () {
      crun.$emit('get-collect-data').then(this.updateCollectData)
    },

    updateCollectData (data) {
      this.collectData = data
    },
  },

  components: {
    ExpressionList
  }
}
</script>
