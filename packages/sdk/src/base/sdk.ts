import { inject, injectable } from 'inversify';
import { Component } from '../component';

@injectable()
class SDKConstruct {
  constructor(@inject(Component) public component: Component) {}
}

export { SDKConstruct };
