import { injectable } from 'inversify';

enum RenderErrorCode {
  ComponentNotFound = '该组件未注册, 请检查',
  MainChildrenNotFound = 'Main节点的子节点不存在',
  MainChildrenNotBlock = 'Main子节点必须为Block节点',
}

@injectable()
class SystemErrorCode {
  getByName(name: keyof typeof RenderErrorCode): RenderErrorCode {
    return RenderErrorCode[name];
  }
}

export { SystemErrorCode };
