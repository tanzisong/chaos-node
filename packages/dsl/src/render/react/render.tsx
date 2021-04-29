import React, { ReactNode } from 'react';
import { AstNode, TagName } from '../../compile/runtime/parse/types';

function Container(props: any) {
  return <div>{props.children}</div>;
}
function Text(props: any) {
  return <span>{props.innerText}</span>;
}
const components = new Map<string, ReactNode>();
components.set('container', Container);
components.set('text', Text);

type GetComponent = (name: TagName) => any;
const getComponent: GetComponent = (name) => {
  return components.get(name);
};

function Render(node: AstNode) {
  const { tag, children, props } = node;
}
