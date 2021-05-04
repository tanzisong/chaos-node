import React, { ReactNode } from 'react';
import Root from './components/Root/index';
import { ReactRender, AST } from '@chaos/dsl';

function Container(props: any) {
  return <div>{props.children}</div>;
}

function Text(props: any) {
  return <span>{props.innerText}</span>;
}

const components = new Map<string, ReactNode>();
components.set('Container', Container);
components.set('Text', Text);

console.info(ReactRender(AST, components));

function App() {
  return <div className="App">{ReactRender(AST, components)}</div>;
}

export default App;
