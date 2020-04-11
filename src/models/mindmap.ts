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

export const OriginPoint: () => PointModel = () => ({
  x: 0,
  y: 0
})

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

export interface LinkModel {
  originId: string
  targetId: string

  origin: PointModel
  target: PointModel
}
