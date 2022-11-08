import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AlarmWithLogsDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import { combineLatest, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { AlarmDetailsApiService, FromType } from './alarm-details-api.service';

interface State extends GenericState<AlarmWithLogsDto> {
  onlyDanger: boolean;
  from: FromType;
}

@Injectable()
export class AlarmDetailsStore extends ComponentStore<State> {
  constructor(private readonly api: AlarmDetailsApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
      onlyDanger: false,
      from: 'lastMonth',
    });
  }

  // Selectors
  private readonly filters$ = combineLatest([
    this.select((state) => state.onlyDanger),
    this.select((state) => state.from),
  ]).pipe(map(([onlyDanger, from]) => ({ onlyDanger, from })));

  readonly vm$ = combineLatest([
    this.select((state) => state.data),
    this.select((state) => state.error),
    this.select((state) => state.status),
    this.filters$,
  ]).pipe(
    map(([data, error, status, filters]) => ({
      data,
      error,
      status,
      onlyDanger: filters.onlyDanger,
      from: filters.from,
    }))
  );

  // Actions
  setOnlyDangerFilter(value: boolean) {
    this.patchState({ onlyDanger: value });
    this.getDetails(this.get((state) => state.data!.id));
  }

  setFromFilter(value: FromType) {
    this.patchState({ from: value });
  }

  // Effects
  readonly getDetails = this.effect<string>((id$) => {
    return id$.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(this.filters$),
      switchMap(([id, filters]) =>
        this.api.getLogs(id, filters.onlyDanger, filters.from).pipe(
          tapResponse(
            (details) => this.patchState(StoreUtils.successState(details)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });
}
