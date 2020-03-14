import { MindMapModel, NodeModel, NodeId } from "../../models/mindmap"

import { v4 as uuidv4 } from "uuid"

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"

interface AddNodePayload {
  beforeId?: NodeId
  parentId: NodeId
  focus?: boolean
}

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
  addNode({ parentId, beforeId }: AddNodePayload) {
    const id = uuidv4()

    const beforeIndex = this.nodes.findIndex(n => n.id === beforeId)

    const newNode = {
      id,
      parentId: parentId,
      content: "Test"
    }

    this.nodes.splice(beforeIndex + 1, 0, newNode)
  }

  @Action({ commit: "addNode" })
  addChild(parentId: string, focus = true) {
    return { parentId }
  }

  @Action({ commit: "addNode" })
  addSibling(payload: AddNodePayload) {
    return payload
  }
}
