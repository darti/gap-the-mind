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
  return getters.tree(d3.hierarchy(d3.stratify()(Object.values(state.nodes))))
}

function tree(state: MindMapModel) {
  return d3
    .tree()
    .separation((a, b) => (a.parent == b.parent ? 10 : 20) / a.depth)
    .nodeSize([5, 100])
}

function nodes(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.descendants().map(mapNode)
}

function links(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.links().map(mapLink)
}

function mapNode(d: any) {
  return {
    ...d.data.data,
    source: d,
    transform: `translate(${d.y},${d.x})`
  }
}

function mapLink(link: any) {
  return {
    id: `${link.source.data.id}-${link.target.data.id}`,
    d: d3
      .linkHorizontal()
      //.source(l => [l.source[0], l.source])
      .x((l: any) => l.y)
      .y((l: any) => l.x)(link),
    transform: "",
    style: {
      stroke: "grey"
    },
    source: link
  }
}