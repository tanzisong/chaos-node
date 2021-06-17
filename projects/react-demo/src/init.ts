import { ReactComponent } from '@chaos/entrance';
import { registerComponent } from '@chaos/sdk';

async function InitSystem() {
  registerComponent(ReactComponent);
}

export { InitSystem };
