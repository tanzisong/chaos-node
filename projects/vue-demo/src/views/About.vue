<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Menu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '../components/Menu/index.vue';

export default defineComponent({
  components: {
    Menu,
  }
});
</script>
