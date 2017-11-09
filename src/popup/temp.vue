<template>
  <div class="temp">{{ name }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['name']
})
</script>

<style>
.temp {
  font-size: 20px;
}
</style>