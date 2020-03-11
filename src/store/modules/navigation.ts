import { NodeModel } from "@/models/mindmap"
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

@Module
export default class NavigationModule extends VuexModule {
  selectedNodeId = "O"

  @Mutation
  setSelectNode(id: string) {
    this.selectedNodeId = id
  }

  @Action
  async selectNode(node: NodeModel) {
    if (this.selectedNodeId != node.id) {
      this.context.commit("setSelectNode", node.id)
    }
  }

  @Action
  async selectParent(node: NodeModel) {
    if (node.parentId) {
      this.context.commit("setSelectNode", node.parentId)
    }
  }
}
