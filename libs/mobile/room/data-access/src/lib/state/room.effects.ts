import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomApiService } from '../api/room-api.service';
import * as RoomActions from './room.actions';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

@Injectable()
export class RoomEffects {
  getRoomDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getRoomDetails),
      fetch({
        run: ({ roomId }) =>
          this.api
            .getRoomDetails(roomId)
            .pipe(
              map((roomDetails) =>
                RoomActions.getRoomDetailsSuccess({ roomDetails })
              )
            ),
        onError: () =>
          RoomActions.getRoomDetailsFail({
            error: 'Connection error. Please try again',
          }),
      })
    )
  );

  constructor(private actions$: Actions, private api: RoomApiService) {}
}
