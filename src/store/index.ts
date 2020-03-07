import Vue from "vue"
import Vuex from "vuex"
import { MindMapModel, NodeModel } from "@/models/mindmap"

import { v4 as uuidv4 } from "uuid"

import layout from "@/layout/cartesian"

Vue.use(Vuex)

export default new Vuex.Store<MindMapModel>({
  state: {
    selectedNode: "1",
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
    addNode(
      state: MindMapModel,
      { parentId, focus }: { parentId: string; focus: boolean }
    ) {
      const id = uuidv4()

      state.nodes = {
        ...state.nodes,
        [id]: {
          id,
          parentId: parentId,
          content: "Test"
        }
      }

      if (focus) {
        state.selectedNode = id
      }
    },
    selectNode(state: MindMapModel, id: string) {
      state.selectedNode = id
    }
  },
  actions: {
    addChild({ commit }, parent: NodeModel, focus = true) {
      commit("addNode", { parentId: parent.id, focus })
    },
    addSibling({ commit }, parent: NodeModel, focus = true) {
      commit("addNode", { parentId: parent.parentId, focus })
    },
    selectNode({ state, commit }, node: NodeModel) {
      if (state.selectedNode != node.id) {
        commit("selectNode", node.id)
      }
    },
    selectParent({ state, commit }, node: NodeModel) {
      if (node.parentId) {
        commit("selectNode", node.parentId)
      }
    }
  },
  modules: {},
  getters: { ...layout }
})
