export interface MindMapModel {
  nodes: { [id: string]: NodeModel }
}

export interface NodeModel {
  id: string
  content: string
  size?: number
  parentId?: string
}
