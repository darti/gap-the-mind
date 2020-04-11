<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component
export default class Theme extends Vue {
  get animationSpeed() {
    return 0.3
  }
}
</script>