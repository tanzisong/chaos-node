import { container } from './base';
import { TYPES } from './types';
import { Component, registerComponent } from './component';
import { SDKConstruct } from './base/sdk';

container.bind<Component>(TYPES.Component).to(Component);
container.bind<SDKConstruct>(TYPES.SDKConstruct).to(SDKConstruct);
const SDK = container.get<SDKConstruct>(TYPES.SDKConstruct);

export { SDK, registerComponent };
export * from './tools';
