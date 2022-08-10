import { SDK } from '@chaos/sdk';

import { AstNode } from '../../../compile';

function MainChildrenVerify(node: AstNode) {
  // Main节点不可为空
  if (!node.children || node.children.length === 0) {
    throw new Error(SDK.SystemErrorCode.getByName('MainChildrenNotFound'));
  }

  // 第一层子节点只能是Block
  if (!node.children.every((child) => SDK.RenderSDK.isLayoutBlock(child.tag))) {
    throw new Error(SDK.SystemErrorCode.getByName('MainChildrenNotBlock'));
  }
}
