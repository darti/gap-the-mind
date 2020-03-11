import { MindMapModel, NodeModel } from "../../models/mindmap"

import { v4 as uuidv4 } from "uuid"

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"

@Module({ name: "nodes" })
export default class NodeModule extends VuexModule {
  nodes = [
    {
      id: "0",
      content: "root"
    },
    {
      id: "3",
      content: "Child 3",
      parentId: "0"
    },
    {
      id: "1",
      content: "Child 1",
      parentId: "0"
    },
    {
      id: "2",
      content: "Child 2",
      parentId: "0"
    }
  ]

  @Mutation
  addNode(state: MindMapModel, { parentId }: { parentId: string }) {
    const id = uuidv4()

    state.nodes.push({
      id,
      parentId: parentId,
      content: "Test"
    })
  }

  @Action
  async addChild(parent: NodeModel, focus = true) {
    this.context.commit("addNode", { parentId: parent.id, focus })
  }

  @Action
  async addSibling(parent: NodeModel, focus = true) {
    this.context.commit("addNode", { parentId: parent.parentId, focus })
  }
}
