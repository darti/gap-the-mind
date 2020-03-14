export type NodeId = string

export interface MindMapModel {
  nodes: NodeModel[]
}

export interface NavigationModel {
  selectedNodeId: NodeId
}

export interface LayoutModel {
  nodeSize: [number, number]
}

export interface NodeLayoutModel {
  transform: string
}

export interface NodeModel {
  id: NodeId
  content: string
  size?: number
  parentId?: NodeId
}
