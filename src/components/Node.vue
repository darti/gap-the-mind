<template>
  <g
    class="node"
    v-bind:transform="node.transform"
    v-bind:class="[node.className, { highlight: node.highlight }]"
  >
    <circle v-bind:r="node.r" v-on:click="add" />

    <text
      v-bind:dx="node.textpos.x"
      v-bind:dy="node.textpos.y"
      v-bind:style="node.textStyle"
      v-bind:transform="node.textStyle.transform"
      v-on:click="add"
    >{{ node.text }}</text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel } from "../models/mindmap"
import { Action } from "vuex-class"

@Component
export default class Node extends Vue {
  @Prop() private node!: any
  @Action private addNode!: any

  public add() {
    this.$log.info("click")
    this.addNode(this.node)
  }
}
</script>

<style>
</style>