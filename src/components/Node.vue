<template>
  <a v-bind:xlink:href="'#' + node.id" v-on:click="select" v-on:keyup.enter="addChild">
    <g
      ref="node"
      class="node"
      v-bind:transform="node.transform"
      v-bind:class="[node.className, { selected }]"
    >
      <circle v-bind:r="node.r" />
      <text
        v-bind:dx="node.textpos.x"
        v-bind:dy="node.textpos.y"
        v-bind:style="node.textStyle"
        v-bind:transform="node.textStyle.transform"
      >{{ node.text }}</text>
    </g>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel } from "../models/mindmap"
import { Action, State } from "vuex-class"

@Component
export default class Node extends Vue {
  @Prop() private node!: NodeModel
  @Action private addNode!: any
  @Action private selectNode!: any
  @State private selectedNode!: any

  private addChild() {
    this.$log.info("click")
    this.addNode(this.node)
  }

  private select() {
    this.selectNode(this.node.id)
  }

  private focus() {
    // this.$refs.node.focus()
  }

  private get selected() {
    return this.node && this.node.id === this.selectedNode
  }
}
</script>

<style scoped lang="stylus"></style>
