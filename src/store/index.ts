import Vue from "vue"
import Vuex, { Store } from "vuex"
import { MindMapModel, NodeModel } from "@/models/mindmap"

import { initializeStores, modules } from "./store-accessor"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]
export * from "@/store/store-accessor"

export default new Vuex.Store({
  plugins,
  modules,
  strict: debug
})
