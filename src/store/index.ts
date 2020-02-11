import Vue from "vue"
import Vuex, { mapGetters } from "vuex"
import { MindMapModel } from "@/models/mindmap"
import { hierarchy, cluster, tree } from "d3"

const RADIUS = 500

Vue.use(Vuex)

export default new Vuex.Store<MindMapModel>({
  state: {
    rootNode: {
      id: "0",
      data: "Root",
      children: [
        { id: "1", data: "Child 1" },
        {
          id: "2",
          data: "Child 2",
          children: [
            { id: "3", data: "Child 3" },
            { id: "4", data: "Child 4" }
          ]
        }
      ]
    }
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    root: (state, getters) => getters.tree(hierarchy(state.rootNode)),
    tree: state => tree().size([RADIUS, RADIUS]),
    nodes: (state, getters) => {
      if (getters.root) return getters.root.descendants().map(mapNode)
    },
    links: (state, getters) => {
      if (getters.root)
        return getters.root
          .descendants()
          .slice(1)
          .map(mapLink)
    }
  }
})

function project(x: number, y: number) {
  var angle = ((x - 90) / 180) * Math.PI,
    radius = y
  return [radius * Math.cos(angle), radius * Math.sin(angle)]
}

function mapNode(d: any) {
  return {
    id: d.data.id,
    r: 2.5,
    text: d.data.data,
    style: {
      transform: `translate(${project(d.x, d.y)})`
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
