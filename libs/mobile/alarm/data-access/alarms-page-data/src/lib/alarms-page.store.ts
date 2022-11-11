import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AlarmDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import { combineLatest, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AlarmsPageApiService } from './alarms-page-api.service';

interface State extends GenericState<AlarmDto[]> {
  selectedId: string | null;
}

interface UpdateStateProps {
  id: string;
  state: boolean;
}

//todo: Get from auth store
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6';

@Injectable()
export class AlarmsPageStore extends ComponentStore<State> {
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
    map(([alarms, error, status, noContent, selectedId]) => ({
      alarms,
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
  readonly getAlarms = this.effect<void>((_) => {
    return _.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(of(homeId)),
      switchMap(([_, homeId]) =>
        this.api.getAlarms(homeId).pipe(
          tapResponse(
            (alarms) => this.patchState(StoreUtils.successState(alarms)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });

  readonly updateState = this.effect<UpdateStateProps>((props$) => {
    return props$.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      switchMap(({ id, state }) =>
        this.api.updateState(id, state).pipe(
          tapResponse(
            () => this.getAlarms(),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });

  readonly updateStateForAll = this.effect<boolean>((state$) => {
    return state$.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(of(homeId)),
      switchMap(([state, homeId]) =>
        this.api.updateStateForAll(homeId, state).pipe(
          tapResponse(
            () => this.getAlarms(),
            () => this.patchState(StoreUtils.errorState(''))
          )
        )
      )
    );
  });

  readonly updateDefaultState = this.effect<UpdateStateProps>((props$) => {
    return props$.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      switchMap(({ id, state }) =>
        this.api.updateDefaultState(id, state).pipe(
          tapResponse(
            () => this.getAlarms(),
            () => this.patchState(StoreUtils.errorState(''))
          )
        )
      )
    );
  });

  constructor(private readonly api: AlarmsPageApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
      selectedId: null,
    });
  }
}
