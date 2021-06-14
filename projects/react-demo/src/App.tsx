import React, { ReactNode } from 'react';
// import Root from '../../../packages/entrance/src/react/Root/index';
import { ReactRender, AST } from '@chaos/dsl';
import { SDK } from '@chaos/sdk';

function Container(props: any) {
  return <div>{props.children}</div>;
}

function Text(props: any) {
  return <span>{props.innerText}</span>;
}

SDK.component.set('Container', Container);
SDK.component.set('Text', Text);

function App() {
  return <div className="App">{ReactRender(AST, SDK.component.getAll())}</div>;
}

export default App;
