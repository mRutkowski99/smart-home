import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FromType } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { SafetyWithLogsDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import { combineLatest, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { SafetyDetailsApiService } from './safety-details-api.service';

interface State extends GenericState<SafetyWithLogsDto> {
  from: FromType;
  onlyDanger: boolean;
}

@Injectable()
export class SafetyDetailsStore extends ComponentStore<State> {
  constructor(private readonly api: SafetyDetailsApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
      from: 'lastMonth',
      onlyDanger: false,
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
    this.getDetails(this.get((state) => state.data!.id));
  }

  // Effects
  readonly getDetails = this.effect<string>((id$) => {
    return id$.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(this.filters$),
      switchMap(([id, filters]) =>
        this.api.getDetails(id, filters.onlyDanger, filters.from).pipe(
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
