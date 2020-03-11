export interface MindMapModel {
  nodes: NodeModel[]
}

export interface NavigationModel {
  selectedNodeId: string
}

export interface LayoutModel {
  nodeSize: [number, number]
}

export interface NodeLayoutModel {
  transform: string
}

export interface NodeModel {
  id: string
  content: string
  size?: number
  parentId?: string
}
