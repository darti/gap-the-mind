<template>
  <div id="app">
    <MindMap />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"

@Component({
  components: {
    MindMap
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
html
  background-color :rgb(30, 32, 35)

body
  margin 0

#app
  width 100vw
  height 100vh
</style>
