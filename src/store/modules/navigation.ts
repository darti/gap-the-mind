import { NodeModel, NodeId } from "@/models/mindmap"
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"

import store from "@/store"

@Module({ name: "navigation", dynamic: true, store })
class NavigationModule extends VuexModule {
  selectedNodeId = "O"

  @Mutation
  setSelectNode(id: NodeId) {
    this.selectedNodeId = id
  }

  @Action
  async selectNode(id: NodeId) {
    if (this.selectedNodeId != id) {
      this.setSelectNode(id)
    }
  }
}

export default getModule(NavigationModule)
