import React, { ReactNode } from 'react';
import { AstNode, TagName, AST } from '../../compile/runtime/parse/types';
import { uniqueKey, upperFirstLetter, SDK } from '@chaos/sdk';

let components: Map<string, ReactNode>;

type GetComponent = (name: TagName) => any;
const getComponent: GetComponent = (name) => {
  return components.get(name);
};

/**
 * 先序遍历AST, 生成react节点
 * */
function RenderNode(node: AstNode): ReactNode {
  const { tag, children, props } = node;
  const key = uniqueKey();

  const Component = getComponent(upperFirstLetter(tag));

  if (!Component) {
    throw new Error(`${tag}=> ${SDK.SystemErrorCode.getByName('ComponentNotFound')}`);
  }

  return (
    <Component {...props} key={key}>
      {children
        ? children.map((child) => {
            return RenderNode(child);
          })
        : null}
    </Component>
  );
}

function Render(AST: AST, component: Map<string, ReactNode>) {
  components = component;
  console.log('dsl-react-render.tsx', AST);
  // todo 校验error/warn判断
  return <>{AST.map((Node) => RenderNode(Node))}</>;
}

export { Render };