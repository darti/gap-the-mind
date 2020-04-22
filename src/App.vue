<template>
  <div id="app">
    <MindMap>
      <template #content="{node, selected, focus, update}">
        <ConteTiptap :node="node" :selected="selected" :focus="focus" :update="update" />
      </template>
    </MindMap>
    <MonacoEditor theme="vs-dark" language="json" height="calc(100vh - 10px)"></MonacoEditor>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"
import MonacoEditor from "monaco-editor-vue"

import ContentSimple from "./components/content/ContentSimple.vue"
import ConteTiptap from "./components/content/ContentTiptap.vue"
@Component({
  components: {
    MindMap,
    ContentSimple,
    ConteTiptap,
    MonacoEditor
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

MindMap {
  flex: auto;
}

MonacoEditor {
  flex: auto;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
