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
    .size([2 * Math.PI, RADIUS])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
}

function nodes(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.descendants().map(mapNode)
}

function links(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.links().map(mapLink)
}

function mapNode(d: any) {
  return {
    id: d.data.name,
    r: 2.5,
    text: d.data.name,
    style: {
      transform: `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
    },
    textpos: {
      x: 8,
      y: 3
    },
    textStyle: {
      textAnchor: "start"
    }
  }
}

function mapLink(d: any) {
  return {
    id: d.target.data.name,
    d: d3
      .linkRadial()
      .angle((l: any) => l.x)
      .radius((l: any) => l.y)(d),

    style: {
      stroke: "grey"
    }
  }
}
