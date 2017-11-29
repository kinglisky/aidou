<template>
  <section id="chrome-extension-aidou">
    <input type="search"
      class="search-input"
      v-model.trim="keyword"
      @keyup.enter="fetchExp">
    <expression-list :query="query"></expression-list>
  </section>
</template>

<script>
import ExpressionList from './components/expression-list'
export default {
  data () {
    return {
      keyword: '',
      query: ''
    }
  },

  computed: {
    
  },

  created () {
  },

  methods: {
    fetchExp () {
      this.query = this.keyword
    }
  },

  components: {
    ExpressionList
  }
}
</script>


<style lang="scss">
#chrome-extension-aidou {
  $border-color: #d1d5da;
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  border: 1px solid $border-color;
  border-radius: 3px;
  box-shadow: 0 0 10px #eee;
  background: #fff;

  * {
    box-sizing: border-box;
  }

  .search-input {
    display: block;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid $border-color;

    &:focus {
      outline: none;
    }
  }
}
</style>

