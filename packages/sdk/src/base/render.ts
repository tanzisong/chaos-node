import { injectable } from 'inversify';
import { TagName } from '@chaos/dsl';
import { upperFirstLetter } from '../tools';

enum LayoutNode {
  Main = 'main',
  Block = 'block',
}

@injectable()
class RenderSDK {
  /**
   * @description 判断是否开启布局区域(由Main节点包裹的节点及其子节点)
   * */
  isLayoutArea(name: TagName) {
    return upperFirstLetter(name) === LayoutNode.Main;
  }

  /**
   * @description 判断节点是否布局开始节点
   * */
  isLayoutMain(name: TagName) {
    return upperFirstLetter(name) === LayoutNode.Main;
  }

  /**
   * @description 判断节点是否布局节点
   * */
  isLayoutBlock(name: TagName) {
    return upperFirstLetter(name) === LayoutNode.Block;
  }
}

export { RenderSDK };
