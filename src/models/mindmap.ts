export interface MindMapModel {
  rootNode: NodeModel

  height: number
  width: number
}

export interface NodeModel {
  id: string
  data: any
  children?: NodeModel[]
}
