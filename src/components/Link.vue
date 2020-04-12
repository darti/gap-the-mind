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
  private tweenedLink = { origin: OriginPoint(), target: OriginPoint() }

  mounted() {
    gsap.fromTo(
      this.tweenedLink,
      this.animationSpeed,
      { origin: this.link.origin, target: this.link.origin },
      { origin: this.link.origin, target: this.link.target }
    )
  }

  @Watch("link", { deep: true })
  onPointModelChanged(value: LinkModel, oldValue: LinkModel) {
    gsap.to(this.tweenedLink, this.animationSpeed, {
      origin: value.origin,
      target: value.target
    })
  }

  private get path() {
    const ox = this.tweenedLink.origin.x + 50
    const oy = this.tweenedLink.origin.y

    const tx = this.tweenedLink.target.x
    const ty = this.tweenedLink.target.y

    return `M${ox},${oy}C${(ox + tx) * 0.5},${oy},${ox},${ty},${tx},${ty}`
  }
}
</script>

<style></style>
