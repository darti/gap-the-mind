<template>
  <g
    class="node"
    v-bind:transform="node.transform"
    v-bind:class="[node.className, { selected }]"
    v-on:click="select"
  >
    <circle v-bind:r="node.r" />

    <text
      v-bind:dx="node.textpos.x"
      v-bind:dy="node.textpos.y"
      v-bind:style="node.textStyle"
      v-bind:transform="node.textStyle.transform"
    >{{ node.text }}</text>
  </g>
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

  public add() {
    this.$log.info("click")
    this.addNode(this.node)
  }

  public select() {
    this.selectNode(this.node.id)
  }

  public get selected() {
    return this.node && this.node.id === this.selectedNode
  }
}
</script>

<style scoped lang="stylus"></style>
