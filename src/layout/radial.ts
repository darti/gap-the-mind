import { MindMapModel } from "@/models/mindmap"
import { GetterTree, Getter } from "vuex"
import * as d3 from "d3"

const RADIUS = 500

const layout = {
  root,
  tree,
  nodes,
  links
}

export default layout

function root(state: MindMapModel, getters: any) {
  return getters.tree(d3.hierarchy(state.rootNode))
}

function tree(state: MindMapModel) {
  return d3
    .tree()
    .size([Math.PI, RADIUS])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
}

function nodes(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.descendants().map(mapNode)
}

function links(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.links().map(mapLink)
}

function spreadAngle(a: number) {
  var sa = (a + 2 * Math.PI) % (2 * Math.PI)

  sa = sa > Math.PI / 2 ? -sa : sa
  sa += Math.PI / 4

  return sa
}

function rad2deg(a: number) {
  return a * (180 / Math.PI)
}

function mapNode(d: any) {
  const angle = rad2deg(spreadAngle(d.x)) - 90

  const isRight = angle > -45

  return {
    id: d.data.name,
    r: 2.5,
    text: d.data.name,
    transform: `rotate(${angle}) translate(${d.y},0)`,
    textpos: {
      x: isRight ? 8 : -8,
      y: 3
    },
    textStyle: {
      textAnchor: isRight ? "start" : "end",
      transform: `rotate(${-angle})`
    }
  }
}

function mapLink(d: any) {
  return {
    id: d.target.data.name,
    d: d3
      .linkRadial()
      .angle((l: any) => spreadAngle(l.x))
      .radius((l: any) => l.y)(d),

    style: {
      stroke: "grey"
    }
  }
}
