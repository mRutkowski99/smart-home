import { filter, map, Subject, Subscription } from 'rxjs';
import { Event } from './event.interface';

export class EventBus<T> {
  protected eventSubject = new Subject<Event<T>>();

  on(eventName: string, handle: (data?: unknown) => void): Subscription {
    return this.eventSubject
      .pipe(
        filter((e) => e.name === eventName),
        map((e) => e.value)
      )
      .subscribe(handle);
  }

  dispatch(event: Event<T>) {
    this.eventSubject.next(event);
  }
}
