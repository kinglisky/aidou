<template>
  <div class="temp">{{ name }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class HelloDecorator extends Vue {
    @Prop() name: string

    log () {
      console.log(this.name)
    }
}
</script>

<style>
.temp {
  font-size: 20px;
}
</style>