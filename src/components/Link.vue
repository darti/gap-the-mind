<template>
  <path class="link" v-bind:d="path" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LinkModel } from "@/models/mindmap"
import gsap from "gsap"

@Component
export default class Link extends Vue {
  @Prop() private link!: LinkModel
  private tweenedLink!: LinkModel

  private get path() {
    const ox = this.link.origin.x + 50
    const oy = this.link.origin.y

    const tx = this.link.target.x
    const ty = this.link.target.y

    return `M${ox},${oy}C${(ox + tx) * 0.5},${oy},${ox},${ty},${tx},${ty}`
  }
}
</script>

<style></style>
