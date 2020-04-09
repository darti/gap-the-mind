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
  id: NodeId
  position: PointModel
}

export type LayoutMap = { [id: string]: LayoutModel }

export interface NodeModel {
  id: NodeId
  content: any
  parentId?: NodeId
}

export interface LinkModel extends DefaultLinkObject {
  originId: string
  targetId: string
}
