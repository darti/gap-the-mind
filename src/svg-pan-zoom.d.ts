declare module "vue-svg-pan-zoom" {
  import { Component, Vue } from "vue-property-decorator"

  class SvgPanZoom extends Vue {
    public fit(): void

    public center(): void

    public resize(): void
  }

  export default SvgPanZoom
}
