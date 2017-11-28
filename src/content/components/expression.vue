<template>
  <div class="cpt-expression">
    <img :src="url">
  </div>
</template>

<script>
export default {
  props: {
    url: String
  }
}
</script>

<style lang="scss">
.cpt-expression {
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #eee;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

