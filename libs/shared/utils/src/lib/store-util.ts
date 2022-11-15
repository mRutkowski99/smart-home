import { NavigationEnd, RouterEvent, Event, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

export type GenericStoreStatus = 'loading' | 'success' | 'error';

export interface GenericState<T> {
  data: T | null;
  status: GenericStoreStatus;
  error: string | null;
}

export class StoreUtils {
  // Workaround for retrieving id from url.
  // For lazy loadded modules ActivatedRoute.params returns empty object
  static getIdFromPath(router: Router): string {
    return router.url.split('/').at(-1)!;
  }

  static loadingState(): Partial<unknown> {
    return { status: 'loading', error: null };
  }

  static errorState(error: string): Partial<unknown> {
    return {
      status: 'error',
      error,
    };
  }

  static successState(data: unknown): Partial<unknown> {
    return {
      data,
      status: 'success',
      error: '',
    };
  }
}
