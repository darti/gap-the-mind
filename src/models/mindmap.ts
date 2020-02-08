export interface MindMapModel {
  rootNode: NodeModel
}

export interface NodeModel {
  id: string
  data: any
  children?: NodeModel[]
}
