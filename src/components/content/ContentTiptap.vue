<template>
  <foreignObject height="50" width="100" v-bind:x="textpos.x" v-bind:y="textpos.y">
    <editor-content :editor="editor" />
  </foreignObject>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from "vue-property-decorator"
import { NodeModel } from "@/models/mindmap"
import { Editor, EditorContent } from "tiptap"

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  History
} from "tiptap-extensions"

import _ from "lodash"
import Theme from "../Theme.vue"

@Component({
  components: {
    EditorContent
  }
})
export default class TiptapContent extends Mixins(Theme) {
  @Prop() private node!: NodeModel
  @Prop() private selected!: boolean
  @Prop() private focus!: () => void
  @Prop() private update!: (newContent: any) => void

  private editor = new Editor({
    extensions: [
      new Blockquote(),
      new BulletList(),
      new CodeBlock(),
      new HardBreak(),
      new Heading({ levels: [1, 2, 3] }),
      new ListItem(),
      new OrderedList(),
      new TodoItem(),
      new TodoList(),
      new Bold(),
      new Italic(),
      new History()
    ]
  })

  private textpos = {
    x: 15,
    y: -25
  }

  beforeDestroy() {
    this.editor.destroy()
  }

  private created() {
    this.editor.on("focus", e => this.focus())

    const update = (e: any) => this.update(e.getHTML())
    this.editor.on("update", _.debounce(update, 250, { maxWait: 2000 }))
  }

  @Watch("node", { immediate: true })
  private onNodeChanged(newNode: NodeModel, oldNode: NodeModel) {
    this.editor.setContent(newNode.content)
  }

  @Watch("selected", { immediate: true })
  private onSelectionChanged(newSelected: boolean, oldSelected: boolean) {
    if (newSelected) {
      this.editor.focus()
    }
  }
}
</script>

<style lang="stylus">
.ProseMirror-focused {
  outline-style: none;
}

.ProseMirror {
  color: white;
}
</style>
