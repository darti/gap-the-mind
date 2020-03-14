import { NodeId, NodeModel } from "../../models/mindmap"

import { v4 as uuidv4 } from "uuid"

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"

import store from "@/store"
import navigation from "./navigation"

interface AddNodePayload {
  id: NodeId
  beforeId?: NodeId
  parentId: NodeId
  focus?: boolean
}

@Module({ dynamic: true, store, name: "nodes" })
class NodeModule extends VuexModule {
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
  addNode({ id, parentId, beforeId }: AddNodePayload) {
    const beforeIndex = this.nodes.findIndex(n => n.id === beforeId)

    const newNode = {
      id,
      parentId: parentId,
      content: "Test"
    }

    this.nodes.splice(beforeIndex + 1, 0, newNode)
  }

  @Action
  addChild(node: NodeModel) {
    const id = uuidv4()

    if (node.parentId) {
      const newId = this.addNode({ id, parentId: node.id })

      navigation.selectNode(id)
    }
  }

  @Action
  addSibling(node: NodeModel) {
    const id = uuidv4()

    if (node.parentId) {
      this.addNode({ id, beforeId: node.id, parentId: node.parentId })

      navigation.selectNode(id)
    }
  }
}

export default getModule(NodeModule)
