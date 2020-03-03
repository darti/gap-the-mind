import Vue from "vue"
import Vuex from "vuex"
import { MindMapModel, NodeModel } from "@/models/mindmap"

import layout from "@/layout/cartesian"

Vue.use(Vuex)

export default new Vuex.Store<MindMapModel>({
  state: {
    nodes: {
      "0": {
        id: "0",
        content: "root"
      },
      "1": {
        id: "1",
        content: "Child 1",
        parentId: "0"
      },
      "2": {
        id: "2",
        content: "Child 2",
        parentId: "0"
      }
    }
  },
  mutations: {
    addNode(state: MindMapModel, parent: NodeModel) {}
  },
  actions: {},
  modules: {},
  getters: { ...layout }
})
