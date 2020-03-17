<template>
  <a v-bind:xlink:href="'#' + node.id" v-on:click="select" tabindex="-1">
    <g ref="node" class="node" v-bind:transform="node.transform" v-bind:class="[{ selected }]">
      <slot name="anchor" v-bind:node="node" v-bind:selected="selected"></slot>
      <foreignObject height="50" width="100" v-bind:x="textpos.x" v-bind:y="textpos.y">
        <editor-content :editor="editor" />
      </foreignObject>
    </g>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { NodeModel, LayoutModel, NodeLayoutModel } from "../models/mindmap"
import { Action, State } from "vuex-class"

import navigation from "@/store/modules/navigation"
import nodes from "@/store/modules/nodes"

import { Editor, EditorContent } from "tiptap"

@Component({
  components: {
    EditorContent
  }
})
export default class Node extends Vue {
  @Prop() private node!: NodeLayoutModel

  private editor = new Editor()

  private textpos = {
    x: 8,
    y: -8
  }

  private textStyle = {
    textAnchor: "start"
  }

  private get r() {
    return this.selected ? 5 : 2.5
  }

  @Watch("node", { immediate: true })
  private onNodeChanged(
    newNode: NodeModel & LayoutModel,
    oldNode: NodeModel & LayoutModel
  ) {
    this.editor.setContent(newNode.content)
  }

  private select() {
    navigation.selectNode(this.node.id)

    this.editor.focus()
  }

  private get selected() {
    return this.node && this.node.id === navigation.selectedNodeId
  }

  beforeDestroy() {
    this.editor.destroy()
  }

  private created() {
    this.editor.on("focus", e => this.select())
  }
}
</script>

<style scoped lang="stylus"></style>
