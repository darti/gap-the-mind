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
    .size([RADIUS, RADIUS])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
}

function nodes(state: MindMapModel, getters: any) {
  if (getters.root) return getters.root.descendants().map(mapNode)
}

function links(state: MindMapModel, getters: any) {
  if (getters.root)
    return getters.root
      .descendants()
      .slice(1)
      .map(mapLink)
}

function project(x: number, y: number) {
  const angle = ((x - 90) / 180) * Math.PI
  const radius = y

  return `translate(${radius * Math.cos(angle)}px, ${radius *
    Math.sin(angle)}px`
}

function mapNode(d: any) {
  return {
    id: d.data.name,
    r: 2.5,
    text: d.data.name,
    style: {
      transform: project(d.x, d.y)
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
    id: d.data.id,
    d: `M${d.y},${d.x}C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${
      d.parent.x
    } ${d.parent.y},${d.parent.x}`,

    style: {
      stroke: "blue"
    }
  }
}
