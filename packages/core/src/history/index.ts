import { createBrowserHistory, Location } from 'history';
import {
  from,
  Observable,
  fromEvent,
  debounceTime,
  AsyncSubject,
  ReplaySubject,
  Subject,
  BehaviorSubject,
  startWith,
  of,
  interval,
  defer,
  catchError,
  throwError,
  async,
  concat,
  delay,
  take,
  zip,
  tap,
  scan,
  combineLatest,
  combineLatestWith,
  pluck,
  partition,
  forkJoin,
  mergeWith,
  pairwise,
  concatWith,
  race,
  timer,
  debounce,
  distinct,
  distinctUntilKeyChanged,
  first,
  last,
  find,
  skip,
  mergeMap,
  switchMap,
  pipe,
  SchedulerLike,
  SchedulerAction,
  observeOn,
  asapScheduler,
  share,
  shareReplay,
  animationFrameScheduler,
  mergeAll,
  sampleTime,
  mapTo,
  expand,
  groupBy,
  toArray,
  // concatAll,
} from 'rxjs';
import {
  reduce,
  throttleTime,
  bufferCount,
  bufferTime,
  bufferWhen,
  distinctUntilChanged,
  concat as concatOperator,
  map,
  concatAll,
} from 'rxjs/operators';

function history() {
  const history = createBrowserHistory();
  // history.push('aaa');
  const location = history.location;

  history.listen((h) => {
    console.info('s', h);
  });

  // setTimeout(() => {
  //   console.info('2miao');
  //   history.push('/sss');
  // }, 2000);
}

function move() {
  const move$ = fromEvent(document, 'mousemove');

  move$.pipe(throttleTime(1000)).subscribe((v) => {
    console.info('v', v);
  });
}

function saveCode() {
  const keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown');

  keyDown$.pipe().subscribe((event) => {
    console.info('event', event);
    if (event.keyCode === 83 && (navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey)) {
      event.preventDefault();
      console.info('保存');
    }
  });
}

function createStream() {
  // const foo = [1, 2, 3];
  // const arr$ = from(foo);
  //
  // const arr = arr$.subscribe((v) => console.info(v));
  //
  // setTimeout(() => {}, 2000);

  // -------------------------
  // const subject = new AsyncSubject();
  // const ob = subject.asObservable();
  //
  // ob.pipe().subscribe((v) => {
  //   console.info('v', v);
  // });
  //
  // setTimeout(() => {
  //   subject.next(1);
  //   subject.next(2);
  //   subject.next(3);
  //   console.info('subject.closed', subject.closed);
  //   setTimeout(() => {
  //     subject.complete();
  //   }, 1000);
  // }, 2000);

  // 会存储一定时间,一定量的值, 即使订阅者在较晚的时机订阅, 也可以接收到之前的值
  const subject1 = new ReplaySubject();
  // const observable = subject.asObservable();
  //
  // subject.next(1);
  // subject.next(2);
  // subject.next(2);
  // subject.next(2);
  // subject.next(2);
  // observable.subscribe(console.log);

  const subject = new BehaviorSubject(1);
  const observable = subject.asObservable();

  const subscription1 = observable.subscribe((v) => {
    console.info('v1', v);
  });

  subject.next(2);
  subject.next(3);
  subscription1.unsubscribe();

  const subscription2 = observable.subscribe((v) => {
    console.info('v2', v);
  });
  subject.next(4);
}

function getCount(n: number) {
  console.info('getCount函数');
  return ++n;
}

function observable() {
  const ob = new Observable((observer) => {
    observer.next(1);
    observer.next(getCount(1));
    setTimeout(() => {
      observer.next('两秒了');
    }, 2000);
    return () => {
      console.info('呦吼, 要取消订阅了? 行吧!');
    };
  });

  const ob1 = ob.subscribe((v) => {
    console.info('v_1', v);
  });
  ob1.unsubscribe();

  setTimeout(() => {
    const ob2 = ob.subscribe((v) => {
      console.info('v_setTimeout', v);
    });
  }, 3000);
}

function createStream_of() {
  const ob = of<any>(1, 2, 3, 4, 5, [6, 7]);

  ob.subscribe((v) => {
    console.info('v', v);
  });
}

function Interval() {
  const ob = interval(3000);

  ob.subscribe((v) => {
    console.info('v_1', v);
  });

  setTimeout(() => {
    ob.subscribe((v) => {
      console.info('v_2', v);
    });
  }, 4000);
}

function Defer() {
  function run() {
    return of(1, 2, 3, [4]);
  }

  const ob = defer(run);

  ob.subscribe((v) => {
    console.info('v', v);
  });
}

/**
 * Subject系列
 * */
function a_series_of_subject() {
  // const subject11 = new Subject();
  const subject11 = new AsyncSubject();
  subject11.next(1);
  const ob = subject11.asObservable();

  const sub1 = ob
    .pipe(
      catchError((err) => {
        console.info('err', err);
        return throwError('我拦截了报错, 重新给你报个错');
      }),
    )
    .subscribe(
      (v) => {
        console.info('subscribe_value', v);
      },
      (error) => {
        console.info('哎呀呀, 报错了=>', error);
      },
    );

  subject11.next(2);
  subject11.error('手动触发错误');
  //
  // const sub2 = ob.subscribe((v) => {
  //   console.info('sub2', v);
  // });
  //
  // subject11.next(3);
  //
  // setTimeout(() => {
  //   sub1.unsubscribe();
  //   console.info('取消了订阅');
  // }, 1000);
}

/**
 * 异步流
 * */
function async_subject() {
  const input$ = new Observable();

  // input$.pipe(async)
}

function concat_operator() {
  console.info(new Date().getSeconds());
  const source1$ = defer(() =>
    from(
      new Promise((resolve, reject) => {
        console.info('source1$-😋', new Date().getSeconds());
        setTimeout(() => {
          console.info('v1', new Date().getSeconds());
          resolve(new Date().getSeconds());
        }, 1000);
      }),
    ),
  );

  const source2$ = defer(() =>
    from(
      new Promise((resolve, reject) => {
        console.info('source2$-😝', new Date().getSeconds());
        setTimeout(() => {
          resolve(new Date().getSeconds());
        }, 2000);
      }),
    ),
  );

  const source3$ = defer(() =>
    from(
      new Promise((resolve, reject) => {
        console.info('source2$-😝', new Date().getSeconds());
        setTimeout(() => {
          console.info('v3', new Date().getSeconds());
          resolve(new Date().getSeconds());
        }, 3000);
      }),
    ),
  );

  const source4$ = new Subject();
  const source6$ = new Subject();
  setInterval(() => {
    source4$.next(`source4$-${new Date().getSeconds()}`);
  }, 1000);

  const source5$ = of(`source5$-${new Date().getSeconds()}`);

  concat(source4$.pipe(take(4)), source6$).subscribe((v) => console.info('v', v));

  setTimeout(() => {
    source6$.next('v6触发');
    source6$.complete();
  }, 6000);
}

function concatAll_operator() {
  const interval$ = interval(2000).pipe(take(1));
  const interval1$ = interval(1000);
  const source$ = of('source$');

  interval$
    .pipe(
      map((x) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`${x}-${new Date().getSeconds()}`);
          }, 1000);
        });
      }),
      concatAll(),
    )
    .subscribe((v) => console.info(v, new Date().getSeconds()));
}

function operators() {
  // const source1$ = from([1, 2, 3, 4]);
  // const source2$ = from([5, 6, 7, 8]);
  // const source3$ = defer(() =>
  //   from(
  //     new Promise((res, rej) => {
  //       setTimeout(() => {
  //         res(new Date().getSeconds());
  //       }, 1000);
  //     }),
  //   ),
  // );
  // const source4$ = defer(() =>
  //   from(
  //     new Promise((res, rej) => {
  //       setTimeout(() => {
  //         res(new Date().getSeconds());
  //       }, 2000);
  //     }),
  //   ),
  // );
  // const source5$ = defer(() => Promise.resolve(new Date().getSeconds()));
  // const source6$ = from(
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(new Date().getSeconds() + '-source6');
  //     }, 5000);
  //   }),
  // );
  //
  // // concat(source3$, source4$).subscribe(async (v) => {
  // //   console.info('异步concat', v);
  // // });
  // source4$.pipe(concatOperator(source6$, source3$, source5$)).subscribe((v) => {
  //   console.info('v', v);
  // });

  const sourceOne = of(1, 2, 3);
  const sourceTwo = of(4, 5, 6);

  const sourceThree = sourceOne.pipe(delay(3000));
  const example = sourceThree.pipe(concatOperator(sourceTwo));
  const subscribe = example.subscribe((val) => console.log('Example: Delayed source one:', val));
}

function zip_operator() {
  const interval$ = interval(1000);
  const source$ = of(1, 2, 3);
  const bodyClick$ = fromEvent(document, 'click').pipe(take(100));

  const subject1$ = new Subject();
  const subject2$ = new Subject();

  bodyClick$.subscribe((v) => {
    subject1$.next('subject1$');
    setTimeout(() => {
      subject2$.next('subject2$');
    }, 1000);
    setTimeout(() => {
      subject2$.error('subject2$-error');
    }, 3000);
  });

  // zip(interval(1000), interval(2000)).subscribe((v) => console.info(new Date().getSeconds()));
  zip(subject1$, subject2$).subscribe((v) => console.info(v));
}

function scan_operator() {
  const number$ = of(1, 2, 3);
  const clickCount$ = fromEvent(document, 'click').pipe(scan((r) => ++r, 0));

  clickCount$.subscribe((v) => {
    console.info('点击次数', v);
  });
}

function tap_operator() {
  const number$ = of(1);

  number$
    .pipe(
      tap((v) => console.info('before-tap', v)),
      map((p, n) => {
        console.info('map', p, n);
        return p;
      }),
      tap((v) => console.info('after-tap', v)),
    )
    .subscribe((v) => {
      console.info('subscribe', v);
    });
}

function combineLatest_operator() {
  /**
   * 案例1
   * */
  const number$ = of(1, 2, 3);
  const clickCount$$ = new Subject();
  const clickCount$ = clickCount$$.asObservable();

  fromEvent<MouseEvent>(document, 'click')
    .pipe(
      scan((p) => {
        return ++p;
      }, 0),
    )
    .subscribe((count) => clickCount$$.next(count));
  const result$ = combineLatest(number$, clickCount$);

  // result$.subscribe((v) => {
  //   console.info('subscribe', v);
  // });

  /**
   * 案例2
   * */
  const number1$ = of(1, 2, 3);
  const number2$ = of(4, 5, 6);

  // combineLatest(number1$, number2$).subscribe((v) => {
  //   console.info('v', v);
  // });

  /**
   * 案例3 => combineLatest结合BehaviorSubject
   * */
  const number4$ = of(1, 2, 3);
  const subject$$ = new BehaviorSubject('初始值');

  // combineLatest(number4$, subject$$).subscribe((v) => {
  //
  // });
  // number4$.pipe(combineLatestWith(subject$$)).subscribe((v) => {
  //   // [3,'初始值']
  //   console.info('v', v);
  // });

  // combineLatest(number4$).subscribe((v) => {
  //   console.info('v', v);
  // });

  const subject1$$ = new Subject<string>();
  const subject1$ = subject1$$.asObservable();
  const subject2$$ = new Subject<string>();
  const subject2$ = subject2$$.asObservable();

  subject1$.subscribe((v) => {
    console.info('v1', v);
  });

  subject1$.subscribe((v) => {
    console.info('v2', v);
  });
  console.info('subject1$$.observers', subject1$$.observers);
  [...subject1$$.observers].forEach((ob) => {
    console.info('ob', ob);
    ob.complete();
  });

  subject1$$.next('v1-1');
  setTimeout(() => {
    subject1$$.next('v1-2');
  }, 0);
  // subject2$$.next('v2-1');
  // Promise.resolve().then((_) => {
  //   subject2$$.next('v2-2');
  // });
}

function pluck_operator() {
  const object$ = of([{ key: { name: 1 } }], [{ key: { name: 2 } }]);
  const arrayObject$ = from([{ key: { name: 1 } }, { key: { name: 2 } }]);

  object$.pipe(pluck('0')).subscribe((v) => {
    console.info('v', v);
  });

  arrayObject$.pipe(pluck('key', 'name')).subscribe((v) => {
    console.info('arrayObject$_v', v);
  });
}

function partition_operator() {
  const object$ = of([{ key: { name: 1 } }], [{ key: { name: 2 } }]);

  const [ob1$, ob2$] = partition(object$, (value) => {
    console.info('value', value);
    return false;
  });

  ob1$.subscribe((v) => console.info('v1', v));
  ob2$.subscribe((v) => console.info('v2', v));
}

function forkJoin_operator() {
  const forkJoin$ = forkJoin([
    of(1, 2),
    of(3, 4).pipe(delay(1000)),
    throwError(() => '报错了'),
  ]).pipe(catchError((err) => of(err)));

  forkJoin$.subscribe(
    (v) => {
      console.info('v', v);
    },
    (error) => {
      console.info(error);
    },
  );
}

function merge_operator() {
  const click$ = fromEvent(document, 'click');
  const dbClick$ = fromEvent(document, 'dblclick');
  const mousemove$ = fromEvent(document, 'mousemove');
  const errorSubject$ = new Subject();

  mousemove$.pipe(take(2), mergeWith(dbClick$, errorSubject$)).subscribe((v) => {
    console.info('v', v);
  });

  setTimeout(() => {
    console.info('一秒了');
    errorSubject$.next('next');
    errorSubject$.complete();
  }, 1000);
}

function pairwise_operator() {
  const clickCount$ = fromEvent<MouseEvent>(document, 'click').pipe(
    scan((p) => {
      if (!p) {
        return '1';
      }
      return p + '-1';
    }, ''),
    startWith(null),
  );

  clickCount$.pipe(pairwise()).subscribe((value) => {
    console.info('value', value);
  });
  return;
  const interval$ = interval(2000).pipe(take(3));

  clickCount$.pipe(combineLatestWith(interval$), pairwise()).subscribe((v) => {
    console.info('v', v);
  });
}

function race_operator() {
  const ob1$ = new Observable((ob) => {
    ob.next(1);
    setTimeout(() => {
      ob.next('ob1$ - 2');
    }, 3000);
  });
  const ob2$ = new Observable((ob) => {
    ob.next(2);
    setTimeout(() => {
      ob.next('ob2$ - 2');
    }, 2000);
  });
  const ob3$ = new Observable((ob) => {
    ob.next(3);
    setTimeout(() => {
      ob.next('ob3$ - 2');
    }, 1000);
  });

  race(ob1$, ob2$, ob3$).subscribe((v) => {
    console.info('v', v);
  });
}

function startWith_operator() {
  const timer$ = timer(1000).pipe(startWith('开始喽'));
  timer$.subscribe((v) => console.info('timer1', v));

  const subject1$$ = new Subject();
  subject1$$
    .pipe(startWith('subject开始', '111', '11222'))
    .subscribe((v) => console.info('subject', v));
  subject1$$.next('1');

  timer$.subscribe((v) => console.info('timer2', v));
}

/**
 * 只有当前值和之前最后一个值不同时才发出值
 * */
function distinctUntilChanged_operator() {
  const number$ = from([1, 2, 2, 3, 4, 5, 5, 6, 1]);
  const obj$ = from([{ name: 1 }, { name: 2, age: 2 }, { name: 2 }, { name: 3 }, { name: 1 }]);

  number$.pipe(distinct()).subscribe((v) => console.info('distinct', v));
  number$.pipe(distinctUntilChanged()).subscribe((v) => console.info('distinctUntilChanged', v));

  obj$.pipe(distinct((value) => value.name)).subscribe((v) => console.info('v', v));
  obj$
    .pipe(distinctUntilChanged((p, c) => p.name === c.name))
    .subscribe((v) => console.info('v1', v));
}

/**
 * 根据时间过滤操作符
 * */
function debounce_operator() {
  const clicks = fromEvent(document, 'click');
  const result = clicks.pipe(
    scan((i) => ++i, 1),
    debounce((i) => {
      console.info('i', i);
      return interval(1000 * i);
    }),
  );
  result.subscribe((x) => console.log(x));
}

/**
 * first last
 * */
function first_operator() {
  const number$ = of(1, 2, 3);
  const input$$ = new Subject<number>();

  input$$
    .pipe(
      first((value, index, source) => {
        console.info(value, index, source);
        return value === 1 || value === 2;
      }, 'default'),
    )
    .subscribe((v) => {
      console.info('v_first', v);
    });

  interval(1000)
    .pipe(take(50))
    .subscribe((v) => {
      input$$.next(v);
      if (v === 3) {
        input$$.complete();
      }
    });

  input$$
    .pipe(
      last((value) => {
        console.info('last_value', value);
        return value >= 4;
      }, 'last的默认值'),
    )
    .subscribe((v) => {
      console.info('v_last', v);
    });
}

function mergeMap_operator() {
  const timer$ = interval(1000);

  timer$.pipe(
    mergeMap(
      (value) => {
        console.info('value', value);
        return interval(5000).pipe(take(2));
      },
      (oldValue, currentValue, oldIndex, currentIndex) => {
        console.info(oldValue, currentValue, oldIndex, currentIndex);
        return {
          oldValue,
          currentValue,
        };
      },
      1,
    ),
  );
  // .subscribe((v) => console.info('subscribe', v));

  timer$.pipe(mergeMap((value) => of(value)));
}

function find_operator() {
  const input$$ = new Subject<number>();

  input$$
    .pipe(
      find((value) => {
        console.info('value', value);
        return value > 4;
      }),
    )
    .subscribe((v) => {
      console.info('v', v);
    });

  interval(500)
    .pipe(take(3))
    .subscribe((v) => {
      input$$.next(v);
    });
}

/**
 * switchMap解决竞速问题
 * */
function switchMap_operator() {
  const timer$ = interval(500).pipe(take(3)); // 模拟用户输入

  timer$
    .pipe(
      switchMap((input) => {
        console.info('input', input);
        // Observable模拟server请求
        return new Observable((subscriber) => {
          subscriber.next(input);
        }).pipe(delay(1000));
      }),
      map((value) => {
        console.info('value是什么?', value);
        return `server: ${value}`;
      }),
    )
    .subscribe((v) => {
      console.info('最终服务端返回的结果', v);
    });
}

/**
 * 验证hot Observable通过操作符结合组合后的冷热性
 * */
function coldOrHotObservable() {
  const number$$ = new BehaviorSubject(1);
  const number$ = number$$.asObservable();

  const string$$ = new BehaviorSubject('1');
  const string$ = string$$.asObservable();

  const stringNumberObservable$ = zip(number$, string$).pipe(
    map((value) => {
      console.info('经过了map', value);
      return {
        string: value[0],
        number: value[1],
      };
    }),
  );

  stringNumberObservable$.subscribe((v) => {
    console.info('v1', v);
  });

  stringNumberObservable$.subscribe((v) => {
    console.info('v2', v);
  });

  setTimeout(() => {
    console.info('2s');
    number$$.next(2);
    string$$.next('2');

    stringNumberObservable$.subscribe((v) => {
      console.info('v3', v);
    });
  }, 2000);
}

/**
 * share操作符(还是在探寻hot and hot Observable问题)
 * */
function share_operator() {
  const ob1$ = new Observable((ob) => {
    console.info('ob1内部');
    ob.next(1);
  });
  const ob2$ = new Observable((ob) => {
    console.info('ob2内部');
    ob.next(2);
  });
  const zip$ = zip(ob1$, ob2$).pipe(shareReplay(1));

  const sub1 = zip$.subscribe((v) => {
    console.info('v1', v);
  });
  sub1.unsubscribe();
  console.info(sub1.closed);

  setTimeout(() => {
    console.info('2秒了');
    zip$.subscribe((v) => {
      console.info('v2', v);
    });
  }, 2000);

  const source1$$ = new Subject();
  const source2$$ = new Subject();

  const zip$$ = zip(source1$$, source2$$).pipe(shareReplay(2));

  zip$$.subscribe((v) => {
    // console.info('v1', v);
  });

  setTimeout(() => {
    // console.info('2秒了');
    zip$$.subscribe((v) => {
      // console.info('v2', v);
    });
  }, 2000);

  source1$$.next(1);
  source2$$.next(2);
  source1$$.next(3);
  source2$$.next(4);
}

function share_timer_operator() {
  const interval$ = interval(2000).pipe(take(3), shareReplay(1));

  interval$.subscribe((value) => {
    console.info('v1', value);
  });

  timer(3000).subscribe((_) => {
    interval$.subscribe((value) => {
      console.info('v2', value);
    });
  });
}

/**
 * 调度器
 * */
function Schedule() {
  // observeOn
  // SchedulerLike
  // SchedulerAction
  const Ob = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  }).pipe(observeOn(animationFrameScheduler));

  const start = new Date().getTime();
  console.info('before');
  Ob.subscribe((v) => {
    const end = new Date().getTime();
    console.info('v', end - start);
  });
  console.info('after');
}

/**
 * 高阶操作符
 * */
function mergeAll_operator() {
  const click$ = fromEvent(window, 'click').pipe(map((value) => interval(1000).pipe(take(5))));

  click$.pipe(mergeAll(2)).subscribe((value) => {
    console.info('value', value);
  });
}

/**
 * 对发出的值采样
 * */
function sample_operator() {
  const click$ = fromEvent(window, 'click');

  click$.pipe(sampleTime(2000)).subscribe((value) => {
    console.info('value', value);
  });
}

/**
 * 递归调用
 * */
function expand_operator() {
  const click$ = fromEvent(window, 'click');

  click$
    .pipe(
      mapTo(1),
      expand((value) => {
        return of(value + 1).pipe(delay(1000));
      }),
      take(3),
    )
    .subscribe(
      (value) => {
        console.info('value', value);
      },
      (error) => {},
      () => {
        console.info('完成了');
      },
    );
}

/**
 * 将流的值分组
 * */
function groupBy_operator() {
  // of(
  //   { id: 1, name: 'JavaScript' },
  //   { id: 2, name: 'Parcel' },
  //   { id: 2, name: 'webpack' },
  //   { id: 1, name: 'TypeScript' },
  //   { id: 3, name: 'TSLint' },
  // )
  //   .pipe(
  //     groupBy((p) => p.id),
  //     mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], []))),
  //   )
  //   .subscribe((p) => console.log(p));
  // return;
  const source$$ = new Subject();
  source$$
    .pipe(
      groupBy((value: any) => {
        return value.name;
      }),
      mergeMap((group) => {
        return group.pipe(toArray());
      }),
    )
    .subscribe((v) => {
      console.info('v', v);
    });

  source$$.next([
    {
      name: 'a',
      age: '1',
    },
    {
      name: 'b',
      age: '2',
    },
    {
      name: 'c',
      age: '3',
    },
    {
      name: 'c',
      age: '4',
    },
  ]);

  source$$.complete();
}

/**
 * 函数调用-便于搜索代码
 * */
// move();
// saveCode();
// createStream();
// observable();
// createStream_of();
// Interval();
// Defer();
// a_series_of_subject();
// async_subject();
// operators();
// concat_operator();
// concatAll_operator();
// zip_operator();
// scan_operator();
// tap_operator();
// combineLatest_operator();
// combineAll_operator();
// pluck_operator();
// partition_operator();
// forkJoin_operator();
// merge_operator();
// pairwise_operator();
// race_operator();
// startWith_operator();
// distinctUntilChanged_operator();
// debounce_operator();
// first_operator();
// mergeMap_operator();
// switchMap_operator();
// find_operator();

// coldOrHotObservable();
// share_operator();
// share_timer_operator();
// Schedule();
//observeOn
// SchedulerLike
// SchedulerAction

// mergeAll_operator();
// sample_operator();
// expand_operator();
groupBy_operator();

export { history };
