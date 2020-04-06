<template>
  <path class="link" v-bind:d="path" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LinkModel } from "../../models/mindmap"
import * as d3 from "d3"

@Component
export default class Link extends Vue {
  @Prop() private link!: LinkModel

  private get path() {
    const d = d3
      .linkHorizontal()

      .x((l: any) => l[0])
      .y((l: any) => l[1])(this.link)

    return d
  }
}
</script>

<style></style>
