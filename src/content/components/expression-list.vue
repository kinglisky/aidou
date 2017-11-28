<template>
  <div class="cpt-expression-list">
    <expression v-for="url in data" :key="url" :url="url"></expression>
  </div>
</template>

<script>
import Expression from './expression'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
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


