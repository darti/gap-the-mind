export interface MindMapModel {
  rootNode: NodeModel
}

export interface NodeModel {
  name: string
  size?: number
  children?: NodeModel[]
}
