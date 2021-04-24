// @ts-nocheck
import React from 'react';
import { render } from 'react-dom';
import App from './App';

// todo react项目热刷新的配置
if (module && module.hot) {
  module.hot.accept();
}

render(<App />, document.querySelector('#root'));
