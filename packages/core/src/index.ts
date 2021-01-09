// todo implements
class CoreIndex {
  private name: string = '';
  private names: string[] = [];

  constructor() {}

  setName(name: string) {
    this.name = name;
  }

  setNames(name: string) {
    this.names.push(name);
  }

  getNames() {
    return this.names;
  }

  getName() {
    return this.name;
  }
}

const Core = new CoreIndex();

export { Core };
