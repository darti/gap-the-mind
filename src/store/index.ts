import Vue from "vue"
import Vuex from "vuex"
import { MindMapModel } from "@/models/mindmap"
import { hierarchy, cluster } from "d3"

Vue.use(Vuex)

export default new Vuex.Store<MindMapModel>({
  state: {
    height: 400,
    width: 600,
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
    tree: state => cluster().size([state.height, state.width - 160]),
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

function mapNode(d: any) {
  return {
    id: d.data.id,
    r: 2.5,
    text: d.data.data,
    style: {
      transform: "translate(" + d.y + "px," + d.x + "px)"
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
