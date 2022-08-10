import { ReactNode } from 'react';
import { ReactComponents } from '@chaos/entrance';
import { registerComponent } from '@chaos/sdk';
import { History } from '@chaos/core';

async function InitSystem() {
  registerComponent(ReactComponents as unknown as Record<string, ReactNode>);
  new History();
}

export { InitSystem };
