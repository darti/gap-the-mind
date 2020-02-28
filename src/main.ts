import Vue from "vue"
import App from "./App.vue"
import store from "./store"

import VueLogger from "vuejs-logger"
import { ILogger } from "vuejs-logger/dist/interfaces/logger"

Vue.config.productionTip = false

const loggerOptions = {}

Vue.use((VueLogger as unknown) as ILogger)

new Vue({
  store,
  render: h => h(App)
}).$mount("#app")
