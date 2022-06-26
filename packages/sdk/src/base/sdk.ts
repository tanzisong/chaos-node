import { inject, injectable } from 'inversify';
import { Component } from '../component';
import { SystemErrorCode } from './error';

@injectable()
class SDKConstruct {
  constructor(
    @inject(Component) public component: Component,
    @inject(SystemErrorCode) public SystemErrorCode: SystemErrorCode,
  ) {}
}

export { SDKConstruct };
