// write react or vue component Singleton container
// provide register and get component interface
// todo vue component register by The environment variable to return different register
import { ReactNode } from 'react';
import { injectable } from 'inversify';

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

export { Component };
