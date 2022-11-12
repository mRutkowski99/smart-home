import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { SafetyDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import { combineLatest, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { SafetyPageApiService } from './safety-page-api.service';

interface State extends GenericState<SafetyDto[]> {
  selectedId: string | null;
}

//todo: Get from auth store
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6';

@Injectable()
export class SafetyPageStore extends ComponentStore<State> {
  // Selectors
  readonly vm$ = combineLatest([
    this.select((state) => state.data),
    this.select((state) => state.error),
    this.select((state) => state.status),
    this.select(
      (state) => state.status === 'success' && state.data?.length === 0
    ),
    this.select((select) => select.selectedId),
  ]).pipe(
    map(([devices, error, status, noContent, selectedId]) => ({
      devices,
      error,
      status,
      noContent,
      selectedId,
    }))
  );

  // Actions
  setSelectedId(id: string) {
    this.patchState({ selectedId: id });
  }

  resetSelectedId() {
    this.patchState({ selectedId: null });
  }

  // Effects
  readonly getSafetyDevices = this.effect<void>((_) => {
    return _.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(of(homeId)),
      switchMap(([_, homeId]) =>
        this.api.getAll(homeId).pipe(
          tapResponse(
            (devices) => this.patchState(StoreUtils.successState(devices)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });

  constructor(private readonly api: SafetyPageApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
      selectedId: null,
    });
  }
}
