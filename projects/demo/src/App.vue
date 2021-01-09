<!--<template>-->
<!--  <div>-->
<!--    <div id="nav">谭梓松</div>-->
<!--    <router-view />-->
<!--  </div>-->
<!--</template>-->

<script lang="ts">
import { defineComponent, h, resolveComponent, createApp } from 'vue';
import { compile } from 'vue/dist/vue.esm-bundler.js';

export default defineComponent({
  setup(props, context) {
    // console.info('context', context);
    testCompile();
    return () => h('div', {}, '谭梓松');
  },
  // render() {
  //   return h(
  //     'div',
  //     {
  //       className: 'tanzisong',
  //     },
  //     [h(resolveComponent('router-view'))],
  //   );
  // },
});

function testCompile() {
  setTimeout(() => {
    const template = `
			<Context>
				<Right>
					hello world!
				</Right>
			</Context>
		`;
    const a = compile(template, {
      transformHoist: (children, context, parent) => {
        console.info(children, context, parent);
      },
      nodeTransforms: [test],
    });
    console.info(createApp(a).mount('#app'));
  }, 0);
}
let INode = null as any;
function test(node, context) {
  if (!INode) {
    INode = node;
    // node = null;
    console.info('INode', INode);
    // console.info(context.currentNode);
    console.info(context.parent);
    // context.currentNode = null;
    // return null;
  }
}
</script>
