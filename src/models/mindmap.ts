import { DefaultLinkObject } from "d3"

export type NodeId = string

export interface MindMapModel {
  nodes: NodeModel[]
}

export interface NavigationModel {
  selectedNodeId: NodeId
}

export interface PointModel {
  x: number
  y: number
}

export interface LayoutModel {
  nodeSize: [number, number]
  position: PointModel
}

export interface NodeModel {
  id: NodeId
  content: any
  parentId?: NodeId
}

export type NodeLayoutModel = NodeModel & LayoutModel

export interface LinkModel extends DefaultLinkObject {
  originId: string
  targetId: string
}
