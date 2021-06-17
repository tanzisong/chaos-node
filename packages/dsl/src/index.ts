/*  resole模块  */
// import { resolve } from './resolve';
// import { createApp } from 'vue';
// // import pageXml from './template/layout/page.xml';
// import pageJson from './template/layout/page.json';
//
// // console.info('pageXml', pageXml);
//
// const Root = resolve(pageJson as any);
// const app = createApp(Root);
// const vm = app.mount('#app');
// console.info(vm);

/* compile模块 */

import { parse, genContext } from './compile';
// import pageXml from './template/layout/page.xml';
import ReactXml from './template/layout/page.xml';
// import multilayerXml from './template/layout/multilayer.xml';

const AST = parse(genContext(ReactXml));

console.info('AST', AST);

export * from './render';
export { AST };
