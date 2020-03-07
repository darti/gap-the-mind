<template>
  <SvgPanZoom
    id="zoomable"
    :zoomEnabled="true"
    :controlIconsEnabled="true"
    :fit="false"
    :center="true"
    minZoom="0.1"
  >
    <svg id="mindmap" :style="svgStyle" viewBox="-500 -500 1000 1000">
      <transition-group tag="g" name="line">
        <Link v-for="link in links" :link="link" class="link" v-bind:key="link.id" />
      </transition-group>

      <transition-group tag="g" name="nodes">
        <Node
          v-on:click="select(index, node)"
          v-for="(node, index) in nodes"
          v-bind:key="node.id"
          :node="node"
        />
      </transition-group>
    </svg>
  </SvgPanZoom>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeModel } from "../models/mindmap"
import SvgPanZoom from "vue-svg-pan-zoom"

import Node from "./Node.vue"
import Link from "./Link.vue"

import { State, Getter, Action, Mutation, namespace } from "vuex-class"

@Component({
  components: {
    Node,
    Link,
    SvgPanZoom
  }
})
export default class MindMap extends Vue {
  @Getter private nodes!: any
  @Getter private links!: any

  private svgStyle = {}

  private select(index: number, node: NodeModel) {
    console.log(node)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.node {
  fill: white;
}

.node.selected {
  fill: red;
}

.link {
  fill: none;
}

#mindmap {
  width: 100%;
  height: 100%;
}

#zoomable {
  width: 100%;
  height: 100%;
}
</style>
