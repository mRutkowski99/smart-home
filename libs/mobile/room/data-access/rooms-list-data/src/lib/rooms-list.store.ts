import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { RoomOverviewDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import {
  combineLatest,
  EMPTY,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { RoomsListApiService } from './rooms-list-api.service';

interface State extends GenericState<RoomOverviewDto[]> {}

//todo: Get from auth store
const homeId = '8feb19a0-531c-475e-8a91-4257d96e08b9';

@Injectable()
export class RoomsListComponentStore extends ComponentStore<State> {
  // Selectors
  private readonly rooms$ = this.select((state) => state.data);
  private readonly error$ = this.select((state) => state.error);
  private readonly noContent$ = this.select(
    (state) => state.data?.length === 0
  );

  readonly vm$ = combineLatest([this.rooms$, this.error$, this.noContent$]);
  readonly status$ = this.select((state) => state.status);

  //Effects
  readonly getRooms = this.effect<void>((_) => {
    return _.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(of(homeId)),
      switchMap(([_, homeId]) =>
        this.api.getRooms(homeId).pipe(
          tapResponse(
            (rooms) => this.patchState(StoreUtils.successState(rooms)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error))
          )
        )
      )
    );
  });

  constructor(private readonly api: RoomsListApiService) {
    super({
      data: null,
      error: null,
      status: 'pending',
    });
  }
}
