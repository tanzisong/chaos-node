import { inject, injectable } from 'inversify';
import { Component } from '../component';
import { SystemErrorCode } from './error';
import { RenderSDK } from './render';

@injectable()
class SDKConstruct {
  constructor(
    @inject(Component) public component: Component,
    @inject(SystemErrorCode) public SystemErrorCode: SystemErrorCode,
    @inject(RenderSDK) public RenderSDK: RenderSDK,
  ) {}
}

export { SDKConstruct };
