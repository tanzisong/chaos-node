import { createBrowserHistory } from 'history';

class History {
  private history = createBrowserHistory();

  constructor() {
    this.listenHistoryChange();
    const location = this.history.location;
    this.setHistory(location.pathname.slice(1));
  }

  setHistory(path: string) {
    this.history.push(path);
  }

  listenHistoryChange() {
    this.history.listen((h) => {
      // console.info('change', h);
    });
  }
}

export { History };
