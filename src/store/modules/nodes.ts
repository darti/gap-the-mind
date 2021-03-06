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

interface AddNodePayload {
  id: NodeId
  beforeId?: NodeId
  before?: boolean
  parentId: NodeId
  focus?: boolean
}

@Module({
  dynamic: true,
  store,
  name: "nodes",
  preserveState: localStorage.getItem("vuex") !== null
})
class NodeModule extends VuexModule {
  nodes: NodeModel[] = [
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

  selectedNodeId = "0"

  @Mutation
  addNode({ id, parentId, beforeId, before }: AddNodePayload) {
    const beforeIndex = beforeId
      ? this.nodes.findIndex(n => n.id === beforeId)
      : -1

    const newNode = {
      id,
      parentId: parentId,
      content: id
    }

    this.nodes.splice(before ? beforeIndex : beforeIndex + 1, 0, newNode)
  }

  @Mutation
  setContent({ id, newContent }: { id: NodeId; newContent: any }) {
    const node = this.nodes.find(n => n.id === id)

    if (node) {
      node.content = newContent
    }
  }

  @Action
  addChild(parentId: NodeId) {
    const id = uuidv4()
    this.addNode({ id, parentId: parentId })

    this.selectNode(id)
  }

  @Action
  addSibling({ sibblingId, before }: { sibblingId: NodeId; before: boolean }) {
    const sibbling = this.nodes.find(n => n.id === sibblingId)

    if (sibbling && sibbling.parentId) {
      const id = uuidv4()
      this.addNode({
        id,
        beforeId: sibblingId,
        parentId: sibbling.parentId,
        before
      })

      this.selectNode(id)
    }
  }

  @Action updateContent(payload: { id: NodeId; newContent: any }) {
    this.setContent(payload)
  }

  @Mutation
  setSelectNode(id: NodeId) {
    this.selectedNodeId = id
  }

  @Action
  selectNode(id: NodeId) {
    if (this.selectedNodeId != id) {
      this.setSelectNode(id)
    }
  }
}

export default getModule(NodeModule)
