import { Container } from 'inversify';

const container = new Container({ defaultScope: 'Singleton', autoBindInjectable: true, skipBaseClassChecks: true });

export { container };
