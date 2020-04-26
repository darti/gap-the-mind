<template>
  <foreignObject
    height="50"
    width="100"
    v-bind:x="textpos.x"
    v-bind:y="textpos.y"
  >
    <div>{{ node.content }}</div>
  </foreignObject>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { PointModel, NodeModel } from "@/models/mindmap"
import { Editor, EditorContent } from "tiptap"

import _ from "lodash"

@Component({
  components: {
    EditorContent
  }
})
export default class SimpleContent extends Vue {
  @Prop() private node!: NodeModel
  @Prop() private position!: PointModel
  @Prop() private selected!: boolean
  @Prop() private focus!: () => void
  @Prop() private update!: (newContent: any) => void

  private textpos = {
    x: 15,
    y: -10
  }
}
</script>

<style lang="stylus"></style>
