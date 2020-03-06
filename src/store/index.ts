import Vue from "vue"
import Vuex from "vuex"
import { MindMapModel, NodeModel } from "@/models/mindmap"

import { v4 as uuidv4 } from "uuid"

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
    addNode(state: MindMapModel, parent: NodeModel) {
      const id = uuidv4()

      state.nodes = {
        ...state.nodes,
        [id]: {
          id,
          parentId: parent.id,
          content: "Test"
        }
      }
    }
  },
  actions: {
    addNode({ commit }, parent: NodeModel) {
      commit("addNode", parent)
    }
  },
  modules: {},
  getters: { ...layout }
})
