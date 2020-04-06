<template>
  <a v-bind:xlink:href="'#' + node.id" v-on:click="select" tabindex="-1">
    <g
      ref="node"
      class="node"
      v-bind:transform="transform"
      v-bind:class="[{ selected }]"
    >
      <slot name="anchor" v-bind:node="node" v-bind:selected="selected"></slot>
      <slot
        name="content"
        v-bind:node="node"
        v-bind:selected="selected"
        v-bind:focus="focus"
        v-bind:update="update"
      ></slot>
    </g>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { NodeModel, LayoutModel, NodeLayoutModel } from "../models/mindmap"
import { Action, State } from "vuex-class"

import navigation from "@/store/modules/navigation"
import nodes from "@/store/modules/nodes"

@Component({})
export default class Node extends Vue {
  @Prop() private node!: NodeLayoutModel

  private get focus() {
    return this.select.bind(this)
  }

  private get update() {
    return this.updateContent.bind(this)
  }

  private updateContent(newContent: any) {
    nodes.updateContent({ id: this.node.id, newContent })
  }

  private select() {
    navigation.selectNode(this.node.id)
  }

  private get selected() {
    return this.node && this.node.id === navigation.selectedNodeId
  }

  private get transform() {
    return `translate(${this.node.position.x}, ${this.node.position.y})`
  }
}
</script>

<style scoped lang="stylus"></style>
