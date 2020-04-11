<template>
  <path class="link" v-bind:d="path" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { LinkModel, PointModel, OriginPoint } from "@/models/mindmap"
import gsap from "gsap"

@Component
export default class Link extends Vue {
  @Prop() private link!: LinkModel
  private tweenedTarget = OriginPoint()

  mounted() {
    gsap.fromTo(this.tweenedTarget, 1, this.link.origin, this.link.target)
  }

  @Watch("link", { deep: true })
  onPointModelChanged(value: LinkModel, oldValue: LinkModel) {
    gsap.to(this.tweenedTarget, 1, value.target)
  }

  private get path() {
    const ox = this.link.origin.x + 50
    const oy = this.link.origin.y

    const tx = this.tweenedTarget.x
    const ty = this.tweenedTarget.y

    return `M${ox},${oy}C${(ox + tx) * 0.5},${oy},${ox},${ty},${tx},${ty}`
  }
}
</script>

<style></style>
