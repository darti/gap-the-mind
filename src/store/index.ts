import Vue from "vue"
import Vuex from "vuex"
import { MindMapModel } from "@/models/mindmap"

import data from "./flare.json"

import layout from "@/layout/radial"

Vue.use(Vuex)

export default new Vuex.Store<MindMapModel>({
  state: {
    rootNode: data
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: { ...layout }
})
