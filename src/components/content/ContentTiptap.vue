<template>
  <foreignObject height="50" width="100" v-bind:x="textpos.x" v-bind:y="textpos.y">
    <editor-content :editor="editor" />
  </foreignObject>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { NodeLayoutModel } from "@/models/mindmap"
import { Editor, EditorContent } from "tiptap"

@Component({
  components: {
    EditorContent
  }
})
export default class TiptapContent extends Vue {
  @Prop() private node!: NodeLayoutModel
  @Prop() private selected!: boolean
  @Prop() private focus!: () => void

  private editor = new Editor()

  private textpos = {
    x: 15,
    y: -25
  }

  beforeDestroy() {
    this.editor.destroy()
  }

  private created() {
    this.editor.on("focus", e => this.focus())
  }

  @Watch("node", { immediate: true })
  private onNodeChanged(newNode: NodeLayoutModel, oldNode: NodeLayoutModel) {
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

<style lang="stylus" >
.ProseMirror-focused {
  outline-style: none;
}
</style>