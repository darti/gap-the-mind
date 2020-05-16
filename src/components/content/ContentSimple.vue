<template>
  <foreignObject height="50" width="100" v-bind:x="textpos.x" v-bind:y="textpos.y">
    <v-textarea :value="node.content" :autofocus="true" :auto-grow="true" :clearable="selected"></v-textarea>
  </foreignObject>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { PointModel, NodeModel } from "@/models/mindmap"

import _ from "lodash"

@Component
export default class ContentSimple extends Vue {
  @Prop() private node!: NodeModel
  @Prop() private position!: PointModel
  @Prop() private selected!: boolean
  @Prop() private focus!: () => void
  @Prop() private update!: (newContent: any) => void

  private textpos = {
    x: 15,
    y: -30
  }
}
</script>

<style lang="stylus"></style>
