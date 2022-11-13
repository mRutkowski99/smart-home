import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { RouteUtil } from '@smart-home/mobile/shared/utils';
import { RoomDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import {
  combineLatest,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { RoomDetailsApiService } from './room-details-api.service';

interface State extends GenericState<RoomDto> {}

@Injectable()
export class RoomDetailsStore extends ComponentStore<State> {
  private readonly id$ = this.route.paramMap.pipe(
    map((params) => params.get(RouteUtil.params.roomId)),
    filter((id) => id !== null)
  );

  // Selectors
  readonly vm$ = combineLatest([
    this.select((state) => state.data),
    this.select((state) => state.error),
    this.select((state) => state.status),
  ]).pipe(map(([room, error, state]) => ({ room, error, state })));

  // Effects
  readonly getRoom = this.effect<void>((_) => {
    return _.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(this.id$),
      switchMap(([_, id]) =>
        this.api.getDetails(id!).pipe(
          tapResponse(
            (room) => this.patchState(StoreUtils.successState(room)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });

  constructor(
    private readonly api: RoomDetailsApiService,
    private readonly route: ActivatedRoute
  ) {
    super({
      data: null,
      error: null,
      status: 'loading',
    });
  }
}
