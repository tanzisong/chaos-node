import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import A from './components/a.vue';

const Root = createApp(App).use(store).use(router);
Root.component('test-a', A); // 注册全局component
Root.directive('highlight', {}); // 注册全局指令
Root.config.globalProperties.foo = 'the custom of variable';

Root.mount('#app');
