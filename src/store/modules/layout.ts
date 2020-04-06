import * as d3 from "d3"

import store from "@/store"

import { VuexModule, Module, getModule } from "vuex-module-decorators"

import nodes from "./nodes"
import { LinkModel, NodeLayoutModel } from "@/models/mindmap"

@Module({ dynamic: true, store, name: "layout" })
class LayoutModule extends VuexModule {
  nodeSize: [number, number] = [5, 100]

  get tree() {
    return d3
      .tree()
      .separation((a, b) => (a.parent == b.parent ? 10 : 20) / a.depth)
      .nodeSize(this.nodeSize)
  }

  get root() {
    return this.tree(d3.hierarchy(d3.stratify()(nodes.nodes)))
  }

  get nodes(): NodeLayoutModel[] {
    return this.root.descendants().map((d: any) => ({
      ...d.data.data,
      position: { x: d.y, y: d.x }
    }))
  }

  get links(): LinkModel[] {
    return this.root.links().map((link: any) => ({
      originId: link.source.data.id,
      targetId: link.target.data.id,
      source: [link.source.y, link.source.x],
      target: [link.target.y, link.target.x]
    }))
  }
}

export default getModule(LayoutModule)
