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
