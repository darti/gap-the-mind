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
  async selectNode(node: NodeModel) {
    if (this.selectedNodeId != node.id) {
      this.setSelectNode(node.id)
    }
  }

  @Action
  async selectParent(node: NodeModel) {
    if (node.parentId) {
      this.setSelectNode(node.parentId)
    }
  }
}

export default getModule(NavigationModule)
