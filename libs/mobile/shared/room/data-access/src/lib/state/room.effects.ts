import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomApiService } from '../api/room-api.service';
import * as RoomActions from './room.actions';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

@Injectable()
export class SharedRoomEffects {
  gelAllOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getAllOverview),
      fetch({
        run: () =>
          this.api
            .getAllOverviews()
            .pipe(map((rooms) => RoomActions.getAllOverviewSuccess({ rooms }))),
        onError: () =>
          RoomActions.getAllOverviewFail({
            error: 'Connection error. Please try again',
          }),
      })
    )
  );

  constructor(private actions$: Actions, private api: RoomApiService) {}
}
