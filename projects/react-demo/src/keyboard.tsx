import React, { useEffect } from 'react';
import {
  fromEvent,
  merge,
  mergeAll,
  filter,
  distinctUntilChanged,
  combineLatest,
  Observable,
  switchMap,
  of,
  debounceTime,
} from 'rxjs';

enum KeyCodes {
  s = 83,
  command = 91,
}

enum KeyType {
  down = 'keydown',
  up = 'keyup',
}

const Keyboard = () => {
  useEffect(() => {
    const saveKeyCodes = [KeyCodes.command, KeyCodes.s];
    const keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown');
    const keyUp$ = fromEvent<KeyboardEvent>(window, 'keyup');

    const keyActions$ = merge([keyDown$, keyUp$]).pipe(mergeAll());

    // 根据saveKeyCodes为每一个按键生成一个流
    const Keys$ = saveKeyCodes.map((key) =>
      keyActions$.pipe(filter((keyEvent) => keyEvent.keyCode === key)),
    );

    const KeepOrder = () => (source: Observable<KeyboardEvent[]>) =>
      source.pipe(
        filter((keys) => {
          const sortedOrder = keys
            .slice()
            .sort((a, b) => a.timeStamp - b.timeStamp)
            .map((key) => key.keyCode)
            .join();

          const originalOrder = keys.map((key) => key.keyCode).join();
          return originalOrder === sortedOrder;
        }),
      );

    combineLatest(Keys$)
      .pipe(
        filter((events) => events.every((event) => event.type === KeyType.down)),
        KeepOrder(),
      )
      .subscribe((event) => {
        console.info('v', event);
        event[1].preventDefault();
      });
  }, []);

  return (
    <>
      <input type="text" />
    </>
  );
};

export default Keyboard;
