import { Event, Router, RoutesRecognized } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { menuItems } from './menu-items';

function getLabel(url: string): string {
  return menuItems.find((menuItem) => url.includes(menuItem.url))?.label ?? '';
}

export function createRouteLabelObservable(router: Router): Observable<string> {
  return router.events.pipe(
    filter(
      (event: Event): event is RoutesRecognized =>
        event instanceof RoutesRecognized
    ),
    map((event: RoutesRecognized) => getLabel(event.url)),
    startWith(getLabel(router.routerState.snapshot.url))
  );
}
