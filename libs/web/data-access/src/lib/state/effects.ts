import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WebApiService } from '../api/web-api.service';
import { webActions } from './actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { WebState } from './reducer';
import { ActivatedRoute } from '@angular/router';
import {webSelectors} from "./selectors";

@Injectable()
export class WebEffects {
  constructor(
    private actions$: Actions,
    private api: WebApiService,
    private store: Store<WebState>,
  ) {}

  log = createEffect(() => this.actions$.pipe(map(x => x.type),tap(console.log)), {dispatch: false})

  getHomes = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.getHomes),
      switchMap(() =>
        this.api.getHomes().pipe(
          map((homes) => webActions.getHomesSuccess({ homes })),
          catchError(() =>
            of(webActions.getHomesFail({ error: 'Failed to fetch' }))
          )
        )
      )
    )
  );

  createHome = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.createHome),
      switchMap((action) =>
        this.api.createHome(action.payload).pipe(
          map(() => webActions.createHomeSuccess()),
          catchError(() =>
            of(webActions.createHomeFail({ error: 'Failed to create' }))
          )
        )
      )
    )
  );

  deleteHome = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.deleteHome),
      switchMap((action) =>
        this.api.deleteHome(action.id).pipe(
          map(() => webActions.deleteHomeSuccess()),
          catchError(() =>
            of(webActions.deleteHomeFail({ error: 'Failed to delete' }))
          )
        )
      )
    )
  );

  refreshHomes = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.createHomeSuccess, webActions.deleteHomeSuccess),
      map(() => webActions.getHomes())
    )
  );

  getRooms = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.getRooms),
      switchMap(({ homeId }) =>
        this.api.getRooms(homeId).pipe(
          map((rooms) => webActions.getRoomsSuccess({ rooms })),
          catchError(() =>
            of(webActions.getRoomsFail({ error: 'Failed to fetch' }))
          )
        )
      )
    )
  );

  createRoom = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.createRoom),
      switchMap((action) =>
        this.api.createRoom(action.payload).pipe(
          map(() => webActions.createRoomSuccess()),
          catchError(() =>
            of(webActions.createRoomFail({ error: 'Failed to create' }))
          )
        )
      )
    )
  );

  updateRoom = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.updateRoom),
      switchMap((action) =>
        this.api.updateRoom(action.payload).pipe(
          map(() => webActions.updateRoomSuccess()),
          catchError(() =>
            of(webActions.updateRoomFail({ error: 'Failed to update' }))
          )
        )
      )
    )
  );

  deleteRoom = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.deleteRoom),
      switchMap((action) =>
        this.api.deleteRoom(action.roomId).pipe(
          map(() => webActions.deleteRoomSuccess()),
          catchError(() =>
            of(webActions.deleteRoomFail({ error: 'Failed to delete' }))
          )
        )
      )
    )
  );

  refreshRooms = createEffect(() =>
    this.actions$.pipe(
      ofType(
        webActions.createRoomSuccess,
        webActions.deleteRoomSuccess,
        webActions.updateRoomSuccess,
          webActions.createDeviceSuccess,
          webActions.updateDeviceSuccess,
          webActions.deleteDeviceSuccess
      ),
        withLatestFrom(this.store.select(webSelectors.selectedHomeIdSelector)),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        map(([_, homeId]) => webActions.getRooms({ homeId: homeId! }))
    )
  );

  createDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.createDevice),
      switchMap((action) =>
        this.api.createDevice(action.payload).pipe(
          map(() => webActions.createDeviceSuccess()),
          catchError(() =>
            of(webActions.createDeviceFail({ error: 'Failed to create' }))
          )
        )
      )
    )
  );

  updateDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.updateDevice),
      switchMap((action) =>
        this.api.updateDevice(action.payload).pipe(
          map(() => webActions.updateDeviceSuccess()),
          catchError(() =>
            of(webActions.updateDeviceFail({ error: 'Failed to update' }))
          )
        )
      )
    )
  );

  deleteDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.deleteDevice),
      switchMap((action) =>
        this.api.deleteDevice(action.deviceId).pipe(
          map(() => webActions.deleteDeviceSuccess()),
          catchError(() =>
            of(webActions.deleteDeviceFail({ error: 'Failed to delete' }))
          )
        )
      )
    )
  );

  getAlarms = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.getAlarm),
      switchMap(({ homeId }) =>
        this.api.getAlarm(homeId).pipe(
          map((alarm) => webActions.getAlarmSuccess({ alarm })),
          catchError(() =>
            of(webActions.getAlarmFail({ error: 'Failed to fetch' }))
          )
        )
      )
    )
  );

  createAlarm = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.createAlarm),
      switchMap((action) =>
        this.api.createAlarm(action.payload).pipe(
          map(() => webActions.createAlarmSuccess()),
          catchError(() =>
            of(webActions.createAlarmFail({ error: 'Failed to create' }))
          )
        )
      )
    )
  );

  deleteAlarm = createEffect(() =>
    this.actions$.pipe(
      ofType(webActions.deleteAlarm),
      switchMap((action) =>
        this.api.deleteAlarm(action.alarmId).pipe(
          map(() => webActions.deleteAlarmSuccess()),
          catchError(() =>
            of(webActions.deleteAlarmFail({ error: 'Failed to delete' }))
          )
        )
      )
    )
  );

  refreshAlarm = createEffect(() => this.actions$.pipe(
      ofType(webActions.createAlarmSuccess, webActions.deleteAlarmSuccess),
      withLatestFrom(this.store.select(webSelectors.selectedHomeIdSelector)),
      map(([_, homeId]) => webActions.getAlarm({homeId: homeId as string}))
  ))
}
