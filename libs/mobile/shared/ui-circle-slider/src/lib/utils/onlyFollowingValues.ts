import { Observable, OperatorFunction } from 'rxjs';

export function onlyFollowingValues(): OperatorFunction<number, number> {
  return (source: Observable<number>): Observable<number> => {
    let previousValue: number | null = null;
    return new Observable<number>((subscriber) => {
      const subscription = source.subscribe({
        next: (value) => {
          if (previousValue === null) {
            previousValue = value;
            subscriber.next(value);
            return;
          }

          if (Math.abs(value - previousValue) <= 1) {
            previousValue = value;
            subscriber.next(value);
          }
        },
        error: (error: any) => subscriber.error(error),
        complete: () => subscriber.complete(),
      });

      return () => subscription.unsubscribe();
    });
  };
}
