<template>
  <div>
    <div id="nav">谭梓松</div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CoreIndex from '@chaos/core';

export default defineComponent({
  setup() {
    const index = new CoreIndex();
    index.setName('谭梓松');
    console.info(index.getName());
  },
});
</script>
