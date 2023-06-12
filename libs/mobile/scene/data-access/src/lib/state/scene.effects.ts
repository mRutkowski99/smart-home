import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from './scene.actions';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';
import { SceneApiService } from '../api/scene-api.service';
import { map } from 'rxjs';
import { SceneEventBus, ScheduleSuccessfullyUpdated } from '../scene.event-bus';

@Injectable()
export class SceneEffects {
  getSceneDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.getSceneDetails),
      fetch({
        run: ({ id }) =>
          this.api
            .getSceneDetails(id)
            .pipe(
              map((scene) => SceneActions.getSceneDetailsSuccess({ scene }))
            ),
        onError: () =>
          SceneActions.getSceneDetailsError({
            error: 'Connection error. Please try again',
          }),
      })
    )
  );

  updateSceneSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateSceneSchedule),
      optimisticUpdate({
        run: (action) =>
          this.api
            .updateSchedule(action.id, action.newSchedule)
            .pipe(map(() => SceneActions.updateSceneScheduleSuccess())),
        undoAction: (action) =>
          SceneActions.undoUpdateSceneSchedule({
            id: action.id,
            schedule: action.schedule,
          }),
      })
    )
  );

  updateScheduleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SceneActions.updateSceneScheduleSuccess),
        map(() => this.eventBus.dispatch(new ScheduleSuccessfullyUpdated()))
      ),
    { dispatch: false }
  );

  updateControlledDeviceState = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateControlledDeviceState),
      optimisticUpdate({
        run: (action) =>
          this.api
            .updateControlledDeviceState(action.newState)
            .pipe(map(() => SceneActions.updateControlledDeviceStateSuccess())),
        undoAction: (action) =>
          SceneActions.undoUpdateControlledDeviceState({ state: action.state }),
      })
    )
  );

  updateControlledDeviceSetpoint = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateControlledDeviceSetpoint),
      optimisticUpdate({
        run: (action) =>
          this.api
            .updateControlledDeviceSetpoint(action.newSetpoint)
            .pipe(
              map(() => SceneActions.updateControlledDeviceSetpointSuccess())
            ),
        undoAction: (action) =>
          SceneActions.undoUpdateControlledDeviceSetpoint({
            setpoint: action.setpoint,
          }),
      })
    )
  );

  removeControlledDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.deleteControlledDevice),
      optimisticUpdate({
        run: (action) =>
          this.api
            .removeControlledDevice(action.sceneId, action.deviceId)
            .pipe(map(() => SceneActions.deleteControlledDeviceSuccess())),
        undoAction: (action) =>
          SceneActions.undoDeleteControlledDevice({ device: action.device }),
      })
    )
  );

  getDeviceGroups = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.getDevicesGroupedByRoom),
      fetch({
        run: () =>
          this.api
            .getDeviceGroups()
            .pipe(
              map((devices) =>
                SceneActions.getDevicesGroupedByRoomSuccess({ devices })
              )
            ),
        onError: () =>
          SceneActions.getDevicesGroupedByRoomFail({
            error: 'Failed to fetch',
          }),
      })
    )
  );

  addControlledDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.addControlledDevice),
      pessimisticUpdate({
        run: ({ payload }) =>
          this.api
            .addControlledDevice(payload)
            .pipe(
              map(() =>
                SceneActions.addControlledDeviceSuccess({
                  sceneId: payload.sceneId,
                })
              )
            ),
        onError: () => SceneActions.addControlledDeviceFail(),
      })
    )
  );

  refreshSceneDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.addControlledDeviceSuccess),
      map(({ sceneId }) => SceneActions.getSceneDetails({ id: sceneId }))
    )
  );

  constructor(
    private actions$: Actions,
    private api: SceneApiService,
    private eventBus: SceneEventBus
  ) {}
}
