import { ReactComponent } from '@chaos/entrance';
import { registerComponent } from '@chaos/sdk';
import { history } from '@chaos/core';

async function InitSystem() {
  registerComponent(ReactComponent);
  history();
}

export { InitSystem };
