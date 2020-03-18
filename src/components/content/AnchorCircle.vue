<template>
  <circle :r="r" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeLayoutModel } from "@/models/mindmap"

@Component({})
export default class CircleAnchor extends Vue {
  @Prop() private node!: NodeLayoutModel
  @Prop() private selected!: boolean

  public get r() {
    return this.selected ? 5 : 2.5
  }
}
</script>
