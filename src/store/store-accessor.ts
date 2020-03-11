import { Store } from "vuex"
import { getModule } from "vuex-module-decorators"

import NodeModule from "@/store/modules/node"
import LayoutModule from "./modules/layout"
import NavigationModule from "./modules/navigation"

export let nodeModule: NodeModule

export function initializeStores(store: Store<any>): void {
  nodeModule = getModule(NodeModule, store)
}

export const modules = {
  nodes: NodeModule,
  layout: LayoutModule,
  navigation: NavigationModule
}
