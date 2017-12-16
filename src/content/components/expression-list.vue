<template>
  <section class="cpt-expression-list">
    <div class="expression-wrapper" @scroll="requestExpression">
      <expression v-for="exp in data" :key="exp.link" :exp="exp"></expression>
    </div>
    <div class="loading-wrapper" v-show="loading">
      <loading :size="10"></loading>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import Expression from './expression'
import crun from '@/common/crun'
import Loading from './loading'

export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },

    page: {
      type: Number,
      default: 1
    },

    total: {
      type: Number,
      default: 0
    },

    loading: Boolean
  },

  computed: {
    pageNum: {
      get () {
        return this.page
      },

      set (v) {
        this.$emit('update:page', v)
      }
    }
  },

  methods: {
    requestExpression: debounce(function ({ target }) {
      const { data, total, loading } = this
      if (data.length === total || loading) return
      const { scrollHeight, offsetHeight, scrollTop } = target
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.pageNum += 1
      }
    }, 400),
  },

  components: {
    Expression,
    Loading
  }
}
</script>

<style lang="scss">
.cpt-expression-list {
  position: relative;
  flex: 1;
  overflow: hidden;
  margin-top: 20px;

  .expression-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .loading-wrapper {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
  }
}
</style>


