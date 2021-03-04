<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup(props, context) {
    console.info('text=>context', context);
    return 'text';
  },
});
</script>
