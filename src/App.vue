<template>
  <v-app id="app">
    <v-content>
      <v-container fluid class="fill-height">
        <MindMap>
          <template #content="{node, selected, focus, update}">
            <ContentSimple :node="node" :selected="selected" :focus="focus" :update="update" />
          </template>
        </MindMap>
      </v-container>
    </v-content>
    <v-navigation-drawer app>
      <MonacoEditor theme="vs-dark" language="json" height="calc(100vh - 10px)"></MonacoEditor>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MindMap from "./components/MindMap.vue"
import MonacoEditor from "monaco-editor-vue"

import ContentSimple from "./components/content/ContentSimple.vue"
import TiptapContent from "./components/content/ContentTiptap.vue"

@Component({
  components: {
    MindMap,
    ContentSimple,
    TiptapContent,
    MonacoEditor
  }
})
export default class App extends Vue {}
</script>

<style lang="stylus">
.node {
  color: black;
}

.link {
  stroke: black;
}
</style>
