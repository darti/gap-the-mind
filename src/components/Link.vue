<template>
  <g>
    <slot name="link" v-bind:link="link"></slot>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LinkModel } from "@/models/mindmap"
import gsap from "gsap"

@Component
export default class Link extends Vue {
  @Prop() private link!: LinkModel
  private tweenedLink: LinkModel
}
</script>

<style></style>
