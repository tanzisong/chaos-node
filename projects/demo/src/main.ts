import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { install } from './index';

const app = createApp(App as any)
  .use(router)
  .use(install)
  .mount('#app');
// const index = (app as any).$Index;
// console.info(app.$slots);
// index.setName('tanzisong');
// console.info(index.getName());

//_______________________________________//
import * as DSL from '@Chaos/dsl';
import * as SDK from '@Chaos/sdk';

import { Core } from '@chaos/core';

// console.info('main.ts', Core.getNames());
// console.info(DSL, SDK);
