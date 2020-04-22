<template>
  <path class="link" v-bind:d="path" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { LinkModel, PointModel, OriginPoint } from "@/models/mindmap"
import gsap from "gsap"
import Theme from "./Theme.vue"

@Component
export default class Link extends Mixins(Theme) {
  @Prop() private link!: LinkModel

  private tweenedTarget = OriginPoint()
  private tweenedSource = OriginPoint()

  mounted() {
    gsap.fromTo(
      this.tweenedTarget,
      this.animationSpeed,
      this.link.source,
      this.link.target
    )

    gsap.fromTo(
      this.tweenedSource,
      this.animationSpeed,
      this.link.source,
      this.link.source
    )
  }

  @Watch("link", { deep: true })
  onPointModelChanged(value: LinkModel, oldValue: LinkModel) {
    gsap.to(this.tweenedTarget, this.animationSpeed, value.target)
    gsap.to(this.tweenedSource, this.animationSpeed, value.source)
  }

  private get path() {
    const ox = this.tweenedSource.x + 80
    const oy = this.tweenedSource.y

    const tx = this.tweenedTarget.x
    const ty = this.tweenedTarget.y

    return `M${ox},${oy}C${(ox + tx) * 0.5},${oy},${ox},${ty},${tx},${ty}`
  }
}
</script>

<style></style>
