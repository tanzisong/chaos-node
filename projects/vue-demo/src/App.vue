<!--<template>-->
<!--  <div id="nav">-->
<!--    <component :is="component"></component>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
<!--  <router-view />-->
<!--</template>-->

<script lang="ts">
import Vue, { defineComponent, resolveComponent, h, resolveDirective, getCurrentInstance } from 'vue';
export default defineComponent({
  setup(this, props, context) {
    const A = resolveComponent('test-a');
    console.info(h(A));
    console.info(resolveDirective('highlight'));
    console.info(this, props, context);
    console.info('getCurrentInstance', getCurrentInstance());
    const {
      appContext: {
        config: {
          globalProperties: { foo },
        },
      },
    } = getCurrentInstance()!;
    console.info('foo', foo);
    return () => h('div', {}, [h('router-view'), h(A)]);
    // return {
    //   component: 'test-a',
    // };
  },
  mounted() {
    console.info('全局变量', (this as any).foo);
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
