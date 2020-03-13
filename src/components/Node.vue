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
import { navigationModule, nodeModule } from "../store"

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
    navigationModule.selectNode(this.node)
  }

  private get selected() {
    return this.node && this.node.id === navigationModule.selectedNodeId
  }

  private created() {
    window.addEventListener("keyup", this.processKeyboardEvent)
  }

  private destroyed() {
    window.removeEventListener("keyup", this.processKeyboardEvent)
  }

  private processKeyboardEvent(e: KeyboardEvent) {
    if (this.selected) {
      this.$log.info(e)

      if (e.code === "Enter" && e.shiftKey) {
        this.$log.info(this.node)
        nodeModule.addChild(this.node)
      } else if (e.code === "Enter") {
        nodeModule.addSibling(this.node)
      } else if (e.code === "ArrowLeft") {
        navigationModule.selectParent(this.node)
      }
    }
  }
}
</script>

<style scoped lang="stylus"></style>
