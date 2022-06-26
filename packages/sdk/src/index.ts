import { container } from './base';

import { Component, registerComponent } from './component';
import { SDKConstruct } from './base/sdk';
import { SystemErrorCode } from './base/error';

import { TYPES } from './types';

container.bind<Component>(TYPES.Component).to(Component);
container.bind<SDKConstruct>(TYPES.SDKConstruct).to(SDKConstruct);
container.bind<SystemErrorCode>(TYPES.SystemErrorCode).to(SystemErrorCode);
const SDK = container.get<SDKConstruct>(TYPES.SDKConstruct);

export { SDK, registerComponent };
export * from './tools';
