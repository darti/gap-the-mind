<template>
  <div id="app">
    <MindMap>
      <template #content="{node, selected, focus, update}">
        <ConteTiptap :node="node" :selected="selected" :focus="focus" :update="update" />
      </template>
    </MindMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"

import ContentSimple from "./components/content/ContentSimple.vue"
import ConteTiptap from "./components/content/ContentTiptap.vue"
@Component({
  components: {
    MindMap,
    ContentSimple,
    ConteTiptap
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
html {
  background-color: rgb(30, 32, 35);
}

body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}
</style>
