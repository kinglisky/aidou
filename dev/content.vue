<template>
  <section class="dev-page">
    <app></app>
  </section>
</template>

<script>
import App  from '../src/content/app.vue'
export default {
  components: {
    App
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html, body {
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dev-page {
  height: 100%;
  width: 100%;
  padding: 40px;

  .code-input {
    width: 600px;
    height: 400px;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px;

    &:focus {
      outline: none;
    }
  }
}

</style>


