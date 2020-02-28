import { MindMapModel } from "@/models/mindmap"
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
    .separation((a, b) => (a.parent == b.parent ? 10 : 20) / a.depth)
    .nodeSize([5, 200])
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
    transform: `rotate(-90) translate(${d.x},${d.y})`,
    textpos: {
      x: 8,
      y: 3
    },
    textStyle: {
      textAnchor: "start",
      transform: `rotate(90)`
    }
  }
}

function mapLink(link: any) {
  return {
    id: link.target.data.name,
    d: d3
      .linkVertical()
      .source(l => [l.source[0], l.source])
      .x((l: any) => l.x)
      .y((l: any) => l.y)(link),
    transform: "rotate(-90)",
    style: {
      stroke: "grey"
    },
    source: link
  }
}
