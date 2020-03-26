<template>
  <SvgPanZoom
    id="zoomable"
    @svgpanzoom="registerSvgPanZoom"
    :zoomEnabled="true"
    :controlIconsEnabled="true"
    :center="true"
    :fit="false"
    minZoom="0.1"
  >
    <svg id="mindmap" :style="svgStyle" viewBox="-500 -500 1000 1000">
      <transition-group tag="g" name="line">
        <Link
          v-for="link in links"
          :link="link"
          class="link"
          v-bind:key="link.id"
        >
          <template #link="{link}">
            <slot name="link" v-bind:link="link"></slot>
          </template>
        </Link>
      </transition-group>

      <transition-group tag="g" name="nodes">
        <Node v-for="node in nodes" v-bind:key="node.id" :node="node">
          <template #anchor="{node, selected}">
            <slot
              name="anchor"
              v-bind:node="node"
              v-bind:selected="selected"
            ></slot>
          </template>

          <template #content="{node, selected, focus, update}">
            <slot
              name="content"
              v-bind:node="node"
              v-bind:selected="selected"
              v-bind:focus="focus"
              v-bind:update="update"
            ></slot>
          </template>
        </Node>
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

import layout from "@/store/modules/layout"
import navigation from "../store/modules/navigation"
import nodes from "@/store/modules/nodes"

@Component({
  components: {
    Node,
    Link,
    SvgPanZoom
  }
})
export default class MindMap extends Vue {
  private svgpanzoom!: SvgPanZoom

  public get nodes() {
    return layout.nodes
  }

  public get links() {
    return layout.links
  }

  private registerSvgPanZoom(svgpanzoom: SvgPanZoom) {
    this.svgpanzoom = svgpanzoom
  }

  private created() {
    window.addEventListener("keyup", this.processKeyboardEvent)
    window.addEventListener("resize", this.processResizeEvent)
  }

  private destroyed() {
    window.removeEventListener("keyup", this.processKeyboardEvent)
    window.removeEventListener("resize", this.processResizeEvent)
  }

  private processResizeEvent() {
    if (this.svgpanzoom) {
      this.svgpanzoom.resize()
    }
  }

  private processKeyboardEvent(e: KeyboardEvent) {
    if (navigation.selectedNodeId) {
      if (e.code === "Enter" && e.shiftKey) {
        nodes.addChild(navigation.selectedNodeId)
      } else if (e.code === "Enter") {
        nodes.addSibling(navigation.selectedNodeId)
      }
    }
  }

  private svgStyle = {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

@namespace svg url(http://www.w3.org/2000/svg);

.node {
  fill: white;
  color white
}

.node.selected {

}

.nodes-enter-active, .nodes-leave-active {
  transition: all 1s;
}

.nodes-enter {
    opacity: 0;
  transform: translateX(-30px);
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
