import Vue from "vue"
import App from "./App.vue"
import store from "./store"

import VueLogger from "vuejs-logger"
import { ILogger } from "vuejs-logger/dist/interfaces/logger"
import vuetify from "./plugins/vuetify"
import "@babel/polyfill"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"

Vue.config.productionTip = false

Vue.use((VueLogger as unknown) as ILogger)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
