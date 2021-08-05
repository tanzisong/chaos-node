import { useCallback, useEffect, useMemo, useState } from 'react';
import { Observable, Subject } from 'rxjs';

function useObservable<T>(input$$: Observable<T>, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = input$$.subscribe({
      next(v) {
        setValue(v);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return value;
}

type EventHandler<T> = (event: T) => void;

function useEventObservable<T>(): [Subject<T>, EventHandler<T>] {
  const subject$$ = useMemo(() => new Subject<T>(), []);

  const handleEvent: EventHandler<T> = useCallback((value) => {
    subject$$.next(value);
  }, []);

  return [subject$$, handleEvent];
}

export { useObservable, useEventObservable };
