<template>
  <div class="menu">
		<Root>
			<div>我是slot</div>
		</Root>
    <el-menu mode="vertical">
      <el-menu-item index="1">1</el-menu-item>
      <el-menu-item index="2">2</el-menu-item>
      <el-menu-item index="3">3</el-menu-item>
      <el-menu-item index="4">4</el-menu-item>
      <el-menu-item index="5">5</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';
import Root from '../Root';

export default defineComponent({
  components: {
    ElMenu,
    ElMenuItem,
		Root,
  },
  setup() {
    const count = ref(0);

    setInterval(() => {
      count.value++;
    }, 1000);

    return {
      count,
    };
  },
});
</script>

<style scoped>
	.menu {
		width: 200px;
	}
</style>
