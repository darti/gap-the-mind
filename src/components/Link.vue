<template>
  <g>
    <slot name="link" v-bind:link="link"></slot>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LinkModel } from "@/models/mindmap"

@Component
export default class Link extends Vue {
  @Prop() private link!: LinkModel
}
</script>

<style></style>
