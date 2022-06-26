import { ReactComponent } from '@chaos/entrance';
import { registerComponent } from '@chaos/sdk';
import { History } from '@chaos/core';

async function InitSystem() {
  registerComponent(ReactComponent);
  new History();
}

export { InitSystem };
