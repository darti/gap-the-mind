import store from "@/store"

import { VuexModule, Module, getModule } from "vuex-module-decorators"

@Module({
  dynamic: true,
  store,
  name: "theme",
  preserveState: localStorage.getItem("vuex") !== null
})
class ThemeModule extends VuexModule {}

export default getModule(ThemeModule)
