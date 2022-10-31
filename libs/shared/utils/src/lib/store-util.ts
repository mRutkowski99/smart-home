import { HttpErrorResponse } from '@angular/common/http';

export type GenericStoreStatus = 'loading' | 'success' | 'error';

export interface GenericState<T> {
  data: T | null;
  status: GenericStoreStatus;
  error: string | null;
}

export class StoreUtils {
  static loadingState(): Partial<unknown> {
    return { status: 'loading', error: null };
  }

  static errorState(error: HttpErrorResponse): Partial<unknown> {
    return {
      status: 'error',
      error: error.message,
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
