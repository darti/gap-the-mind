<template>
  <path class="link" v-bind:d="link.d" v-bind:style="link.style" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class Link extends Vue {
  @Prop() private link!: any
}
</script>

<style>
</style>