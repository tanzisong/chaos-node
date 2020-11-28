// todo implements
export default class CoreIndex {
  private name!: string;
  constructor() {
    console.info('ss');
  }
  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
