<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component
export default class Theme extends Vue {
  get selectAnimationSpeed() {
    return 1
  }

  get animationSpeed() {
    return 0.4
  }
}
</script>