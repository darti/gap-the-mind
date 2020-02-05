<template>
  <svg id="mindmap" v-bind:width="width" v-bind:height="height">
    <transition-group tag="g" name="line">
      <path
        v-for="link in links"
        class="link"
        v-bind:key="link.id"
        v-bind:d="link.d"
        v-bind:style="link.style"
      ></path>
    </transition-group>

    <transition-group tag="g" name="list">
      <g
        class="node"
        v-on:click="select(index, node)"
        v-for="(node, index) in nodes"
        v-bind:key="node.id"
        v-bind:style="node.style"
        v-bind:class="[node.className, { highlight: node.highlight }]"
      >
        <circle v-bind:r="node.r"></circle>

        <text
          v-bind:dx="node.textpos.x"
          v-bind:dy="node.textpos.y"
          v-bind:style="node.textStyle"
        >
          {{ node.text }}
        </text>
      </g>
    </transition-group>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel } from "../models/mindmap"

import { State, Getter, Action, Mutation, namespace } from "vuex-class"

@Component
export default class MindMap extends Vue {
  @State private width!: number
  @State private height!: number

  @State private rootNode!: NodeModel

  @Getter private nodes!: any
  @Getter private links!: any

  private select(index: number, node: NodeModel) {
    console.log(node)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.node
  fill white

.link
  fill none

#mindmap
  border 1px dashed gray
</style>
