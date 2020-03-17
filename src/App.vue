<template>
  <div id="app">
    <MindMap>
      <template #anchor="{node, selected}">
        <AnchorCircle :node="node" :selected="selected" />
      </template>
      <template #content="{node, selected, focus}">
        <ContentTiptap :node="node" :selected="selected" :focus="focus" />
      </template>
    </MindMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"
import ContentTiptap from "./components/content/ContentTiptap.vue"

import AnchorCircle from "./components/content/AnchorCircle.vue"

@Component({
  components: {
    MindMap,
    AnchorCircle,
    ContentTiptap
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
