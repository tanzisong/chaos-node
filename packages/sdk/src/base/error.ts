import { injectable } from 'inversify';

enum ErrorCode {
  ComponentNotFound = '该组件未注册, 请检查',
}

@injectable()
class SystemErrorCode {
  getByName(name: keyof typeof ErrorCode): ErrorCode {
    return ErrorCode[name];
  }
}

export { SystemErrorCode };
