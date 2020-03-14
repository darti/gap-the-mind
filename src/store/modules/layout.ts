import * as d3 from "d3"
import { GetterTree } from "vuex"

import store from "@/store"

import { NodeModel } from "@/models/mindmap"
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"

import nodes from "./nodes"

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

  get nodes() {
    return this.root.descendants().map((d: any) => ({
      ...d.data.data,
      source: d,
      transform: `translate(${d.y},${d.x})`
    }))
  }

  get links() {
    return this.root.links().map((link: any) => ({
      id: `${link.source.data.id}-${link.target.data.id}`,
      d: d3
        .linkHorizontal()
        //.source(l => [l.source[0], l.source])
        .x((l: any) => l.y)
        .y((l: any) => l.x)(link),
      transform: "",
      style: {
        stroke: "grey"
      },
      source: link
    }))
  }
}

export default getModule(LayoutModule)
