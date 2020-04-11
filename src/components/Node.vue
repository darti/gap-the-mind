<template>
  <a v-bind:xlink:href="'#' + node.id" v-on:click="select" tabindex="-1">
    <g ref="node" class="node" v-bind:transform="transform" v-bind:class="[{ selected }]">
      <circle :r="tweenedR.value" />
      <slot
        name="content"
        v-bind:node="node"
        v-bind:position="position"
        v-bind:selected="selected"
        v-bind:focus="focus"
        v-bind:update="update"
      ></slot>
    </g>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import {
  NodeModel,
  LayoutModel,
  PointModel,
  OriginPoint
} from "../models/mindmap"
import { Action, State } from "vuex-class"

import gsap from "gsap"

import navigation from "@/store/modules/navigation"
import nodes from "@/store/modules/nodes"
import layout from "../store/modules/layout"
import Theme from "./Theme.vue"

@Component({})
export default class Node extends Mixins(Theme) {
  @Prop() private node!: NodeModel
  @Prop() private position!: PointModel

  private tweenedPosition = OriginPoint()

  private tweenedR = { value: 5 }

  mounted() {
    gsap.fromTo(
      this.tweenedPosition,
      this.animationSpeed,
      this.parentNodePosition,
      this.position
    )
    gsap.to(this.tweenedR, this.animationSpeed, {
      value: this.selected ? 15 : 5
    })
  }

  get parentNodePosition() {
    if (this.node.parentId) {
      return layout.layout[this.node.parentId].position
    }

    return OriginPoint()
  }

  private get animatedPosition() {
    return this.tweenedPosition
  }

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
    return `translate(${this.tweenedPosition.x}, ${this.tweenedPosition.y})`
  }

  @Watch("position", { deep: true })
  onPointModelChanged(value: PointModel, oldValue: PointModel) {
    gsap.to(this.tweenedPosition, this.animationSpeed, value)
  }

  @Watch("selected", { deep: true })
  onSelectedChanged(value: boolean, oldValue: boolean) {
    gsap.to(this.tweenedR, this.animationSpeed, {
      value: this.selected ? 15 : 5
    })
  }
}
</script>

<style scoped lang="stylus"></style>
