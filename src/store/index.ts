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
        { id: "2", data: "Child 2" }
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
      x: d.children ? -8 : 8,
      y: 3
    },
    textStyle: {
      textAnchor: d.children ? "end" : "start"
    }
  }
}
