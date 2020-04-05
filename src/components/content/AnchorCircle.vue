<template>
  <transition name="anchor">
    <circle v-if="selected" r="7.5" key="selected" />
    <circle v-else r="2.5" key="unselected" />
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { NodeLayoutModel } from "@/models/mindmap"

@Component({})
export default class CircleAnchor extends Vue {
  @Prop() private node!: NodeLayoutModel
  @Prop() private selected!: boolean
}
</script>

<style lang="stylus">
@keyframes growshrink {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.anchor-enter-active {
  animation: growshrink 0.4s;
}

.anchor-leave-active {
  animation: growshrink 0.4s reverse;
}
</style>
