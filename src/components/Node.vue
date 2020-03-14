<template>
  <a v-bind:xlink:href="'#' + node.id" v-on:click="select">
    <g ref="node" class="node" v-bind:transform="node.transform" v-bind:class="[{ selected }]">
      <circle v-bind:r="r" />
      <text v-bind:dx="textpos.x" v-bind:dy="textpos.y" v-bind:style="textStyle">{{ node.content }}</text>
    </g>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel, LayoutModel } from "../models/mindmap"
import { Action, State } from "vuex-class"

import navigation from "@/store/modules/navigation"
import nodes from "@/store/modules/nodes"

@Component
export default class Node extends Vue {
  @Prop() private node!: NodeModel & LayoutModel

  private textpos = {
    x: 8,
    y: 3
  }

  private textStyle = {
    textAnchor: "start"
  }

  private r = 2.5

  private select() {
    navigation.selectNode(this.node.id)
  }

  private get selected() {
    return this.node && this.node.id === navigation.selectedNodeId
  }
}
</script>

<style scoped lang="stylus"></style>
