import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AlarmDto, AlarmWithLogsDto } from '@smart-home/shared/dto';
import {
  GenericState,
  GenericStoreStatus,
  StoreUtils,
} from '@smart-home/shared/utils';
import {
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AlarmsPageApiService, FromType } from './alarms-page-api.service';

interface State extends GenericState<AlarmDto[]> {
  selectedId: string | null;
  details: AlarmWithLogsDto | null;
  detailsStatus: GenericStoreStatus;
}

interface GetDetailsProps {
  alarmId: string;
  from: FromType;
  onlyDanger: boolean;
}

//todo: Get from auth store
const homeId = '51e93387-8e2c-4b59-88ca-e6f4f43c56f6';

@Injectable()
export class AlarmsPageStore extends ComponentStore<State> {
  // Selectors
  readonly alarmsListVm$ = combineLatest([
    this.select((state) => state.data),
    this.select((state) => state.selectedId),
    this.select((state) => state.error),
    this.select((state) => state.status),
    this.select(
      (state) => state.status === 'success' && state.data?.length === 0
    ),
  ]).pipe(
    map(([alarms, selectedId, error, status, noContent]) => ({
      alarms,
      selectedId,
      error,
      status,
      noContent,
    }))
  );

  readonly alarmsDetailsVm$ = combineLatest([
    this.select((state) => state.selectedId !== null),
    this.select((state) => state.details),
    this.select((state) => state.detailsStatus),
  ]).pipe(map(([isSelected, data, status]) => ({ isSelected, data, status })));

  // Actions
  private setSelectedId(selectedId: string) {
    this.patchState({ selectedId });
  }

  getDetails(alarmId: string, from: FromType, onlyDanger: boolean) {
    this.setSelectedId(alarmId);
    this.getDetailsEffect({ alarmId, from, onlyDanger });
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

  private readonly getDetailsEffect = this.effect<GetDetailsProps>(
    (props$: Observable<GetDetailsProps>) => {
      return props$.pipe(
        tap(() => this.patchState({ detailsStatus: 'loading' })),
        switchMap(({ alarmId, from, onlyDanger }) =>
          this.api.getLogs(alarmId, onlyDanger, from).pipe(
            tapResponse(
              (details) =>
                this.patchState({ details, detailsStatus: 'success' }),
              () => this.patchState({ detailsStatus: 'error' })
            )
          )
        )
      );
    }
  );

  constructor(private readonly api: AlarmsPageApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
      selectedId: null,
      details: null,
      detailsStatus: 'loading',
    });
  }
}
