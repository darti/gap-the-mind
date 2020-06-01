import * as d3 from "d3"

import store from "@/store"

import { VuexModule, Module, getModule } from "vuex-module-decorators"

import nodes from "./nodes"
import { LinkModel, NodeModel, LayoutMap } from "@/models/mindmap"

@Module({
  dynamic: true,
  store,
  name: "layout"
})
class LayoutModule extends VuexModule {
  nodeSize: [number, number] = [5, 150]

  get root() {
    const stratify = d3.stratify<NodeModel>()

    const tree = d3
      .tree<d3.HierarchyNode<NodeModel>>()
      .separation((a, b) => (a.parent == b.parent ? 10 : 20))
      .nodeSize(this.nodeSize)

    return tree(d3.hierarchy(stratify(nodes.nodes)))
  }

  get layout(): LayoutMap {
    return this.root.descendants().reduce<LayoutMap>(
      (
        m: LayoutMap,
        d: d3.HierarchyPointNode<d3.HierarchyNode<NodeModel>>
      ) => ({
        ...m,
        [d.data.data.id]: { id: d.data.data.id, position: { x: d.y, y: d.x } }
      }),
      {}
    )
  }

  get links(): LinkModel[] {
    return this.root.links().map((link: any) => ({
      sourceId: link.source.data.id,
      targetId: link.target.data.id,
      source: { x: link.source.y, y: link.source.x },
      target: { x: link.target.y, y: link.target.x }
    }))
  }
}

export default getModule(LayoutModule)
