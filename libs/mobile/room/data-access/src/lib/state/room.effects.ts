import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomApiService } from '../api/room-api.service';
import * as RoomActions from './room.actions';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs';

@Injectable()
export class RoomEffects {
  getRoomDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getRoomDetails),
      fetch({
        run: ({ roomId }) =>
          this.roomApi
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

  updateDeviceSetpoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.updateDeviceSetpoint),
      optimisticUpdate({
        run: ({ deviceId, newValue }) =>
          this.roomApi
            .updateDeviceSetpoint(deviceId, newValue)
            .pipe(map(() => RoomActions.updateDeviceSetpointSuccess())),
        undoAction: ({ deviceId, value }) =>
          RoomActions.undoUpdateDeviceSetpoint({ deviceId, value }),
      })
    )
  );

  updateDeviceState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.updateDeviceState),
      optimisticUpdate({
        run: ({ deviceId, value }) =>
          this.roomApi
            .updateDeviceState(deviceId, value)
            .pipe(map(() => RoomActions.updateDeviceStateSuccess())),
        undoAction: ({ deviceId, value }) =>
          RoomActions.undoUpdateDeviceState({ deviceId, value: !value }),
      })
    )
  );

  constructor(private actions$: Actions, private roomApi: RoomApiService) {}
}
