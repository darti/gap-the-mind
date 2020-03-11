import * as d3 from "d3"
import { GetterTree } from "vuex"

import { NodeModel } from "@/models/mindmap"
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import NodeModule from "./node"
import { nodeModule } from "../store-accessor"

@Module
export default class LayoutModule extends VuexModule {
  nodeSize = [5, 100]

  get tree() {
    return d3
      .tree()
      .separation((a, b) => (a.parent == b.parent ? 10 : 20) / a.depth)
      .nodeSize([5, 100])
  }

  get root() {
    return this.tree(d3.hierarchy(d3.stratify()(nodeModule.nodes)))
  }
}
