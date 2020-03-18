<template>
  <div id="app">
    <MindMap>
      <template #link="{link}">
        <LinkPath :link="link" />
      </template>
      <template #anchor="{node, selected}">
        <AnchorCircle :node="node" :selected="selected" />
      </template>
      <template #content="{node, selected, focus, update}">
        <ContentTiptap :node="node" :selected="selected" :focus="focus" :update="update" />
      </template>
    </MindMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"

import ContentTiptap from "./components/content/ContentTiptap.vue"
import AnchorCircle from "./components/content/AnchorCircle.vue"
import LinkPath from "./components/content/LinkPath.vue"

@Component({
  components: {
    MindMap,
    AnchorCircle,
    ContentTiptap,
    LinkPath
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
