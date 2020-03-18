export type NodeId = string

export interface MindMapModel {
  nodes: NodeModel[]
}

export interface NavigationModel {
  selectedNodeId: NodeId
}

export interface LayoutModel {
  nodeSize: [number, number]
  transform: string
}

export interface NodeModel {
  id: NodeId
  content: any
  size?: number
  parentId?: NodeId
}

export type NodeLayoutModel = NodeModel & LayoutModel

export interface LinkModel {}
