import React, { ReactNode } from 'react';
import { AstNode, TagName, AST } from '../../compile';
import { uniqueKey, upperFirstLetter, SDK } from '@chaos/sdk';

let components: Map<string, ReactNode>;

// TODO getComponent类型, component类型规整
type GetComponent = (name: TagName) => any;
const getComponent: GetComponent = (name) => {
  return components.get(name);
};

/**
 * 先序遍历AST, 生成react节点
 * */
function RenderNode(node: AstNode): ReactNode {
  const { tag: tagName, children, props } = node;
  const key = uniqueKey();

  const Component = getComponent(upperFirstLetter(tagName));

  if (!Component) {
    throw new Error(`${tagName}=> ${SDK.SystemErrorCode.getByName('ComponentNotFound')}`);
  }

  if (SDK.RenderSDK.isLayoutArea(tagName)) {
    LayoutAreaRender(node);
    // TODO return LayoutAreaRender node
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

/**
 * 渲染layout区域节点
 * 校验: 1: 布局节点名称 2: 布局属性比例
 * */
function LayoutAreaRender(node: AstNode): ReactNode {
  const { tag: tagName, children, props } = node;

  if (SDK.RenderSDK.isLayoutMain(tagName)) {
    // 1. 第一层子节点只能是Block;
    /**
     * 1. w/h 100%模式
     * 2. 固定h/w模式
     * 3. 自由h/w模式, 靠内部节点撑开,且内部第一层只能是绝对值(px)
     * */
  }
}

function Render(AST: AST, component: Map<string, ReactNode>) {
  components = component;
  console.log('dsl-react-render.tsx', AST);
  // todo 校验error/warn判断
  return <>{AST.map((Node) => RenderNode(Node))}</>;
}

export { Render };
