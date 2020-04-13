import Vue from "vue"
import Vuex from "vuex"

import VuexPersistence from "vuex-persist"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<any>({
  storage: window.localStorage,
  modules: ["nodes"]
})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin]
})
