// write react or vue component Singleton container
// provide register and get component interface
// todo vue component register by The environment variable to return different register
import { ReactNode } from 'react';
import { injectable } from 'inversify';
import { isFunction } from 'lodash-es';
import { SDK } from '../index';

@injectable()
class Component {
  private component = new Map<string, ReactNode>();
  constructor() {}

  get(name: string) {
    return this.component.get(name);
  }

  getAll() {
    return this.component;
  }

  set(name: string, component: ReactNode) {
    if (this.get(name)) {
      throw new Error(`${name} has been registered`);
    }
    this.component.set(name, component);
  }
}

function registerComponent(Components: Record<string, ReactNode>) {
  Object.entries(Components).forEach((component) => {
    if (!isFunction(component[1])) {
      throw new Error(`registerComponent error: ${component[0]}is not an react function`);
    }
    SDK.component.set(component[0], component[1]);
  });

  return SDK.component.getAll();
}

export { Component, registerComponent };
