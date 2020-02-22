<template>
  <g
    class="node"
    v-bind:transform="node.transform"
    v-bind:class="[node.className, { highlight: node.highlight }]"
  >
    <circle v-bind:r="node.r" />

    <text
      v-bind:dx="node.textpos.x"
      v-bind:dy="node.textpos.y"
      v-bind:style="node.textStyle"
      v-bind:transform="node.textStyle.transform"
    >{{ node.text }}</text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel } from "../models/mindmap"

@Component
export default class Node extends Vue {
  @Prop() private node!: any
}
</script>

<style>
</style>