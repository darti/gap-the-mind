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
