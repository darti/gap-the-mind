export interface MindMapModel {
  nodes: { [id: string]: NodeModel }
  selectedNode: string
}

export interface LayoutModel {
  transform: string
}

export interface NodeModel {
  id: string
  content: string
  size?: number
  parentId?: string
}
