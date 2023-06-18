import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from './scene.actions';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';
import { SceneApiService } from '../api/scene-api.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SceneEventBus, ScheduleSuccessfullyUpdated } from '../scene.event-bus';
import { Router } from '@angular/router';
import { MainRoutes } from '@smart-home/mobile/shared/util';

@Injectable()
export class SceneEffects {
  getSceneDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.getSceneDetails),
      switchMap((a) =>
        this.api.getSceneDetails(a.id).pipe(
          map((scene) => SceneActions.getSceneDetailsSuccess({ scene })),
          catchError(() =>
            of(
              SceneActions.getSceneDetailsError({
                error: 'Connection error. Please try again',
              })
            )
          )
        )
      )
    )
  );

  updateSceneSchedule = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateSceneSchedule),
      switchMap((a) =>
        this.api.updateSchedule(a.id, a.newSchedule).pipe(
          map(() => SceneActions.updateSceneScheduleSuccess()),
          catchError(() =>
            of(
              SceneActions.undoUpdateSceneSchedule({
                id: a.id,
                schedule: a.schedule,
              })
            )
          )
        )
      )
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
      switchMap((a) =>
        this.api.updateControlledDeviceState(a.newState).pipe(
          map(() => SceneActions.updateControlledDeviceStateSuccess()),
          catchError(() =>
            of(SceneActions.undoUpdateControlledDeviceState({ state: a.state }))
          )
        )
      )
    )
  );

  updateControlledDeviceSetpoint = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateControlledDeviceSetpoint),
      switchMap((a) =>
        this.api.updateControlledDeviceSetpoint(a.newSetpoint).pipe(
          map(() => SceneActions.updateControlledDeviceSetpointSuccess()),
          catchError(() =>
            of(
              SceneActions.undoUpdateControlledDeviceSetpoint({
                setpoint: a.setpoint,
              })
            )
          )
        )
      )
    )
  );

  removeControlledDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.deleteControlledDevice),
      switchMap((a) =>
        this.api.removeControlledDevice(a.sceneId, a.deviceId).pipe(
          map(() => SceneActions.deleteControlledDeviceSuccess()),
          catchError(() =>
            of(SceneActions.undoDeleteControlledDevice({ device: a.device }))
          )
        )
      )
    )
  );

  getDeviceGroups = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.getDevicesGroupedByRoom),
      switchMap((a) =>
        this.api.getDeviceGroups().pipe(
          map((devices) =>
            SceneActions.getDevicesGroupedByRoomSuccess({ devices })
          ),
          catchError(() =>
            of(
              SceneActions.getDevicesGroupedByRoomFail({
                error: 'Failed to fetch',
              })
            )
          )
        )
      )
    )
  );

  addControlledDevice = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.addControlledDevice),
      switchMap((a) =>
        this.api.addControlledDevice(a.payload).pipe(
          map(() =>
            SceneActions.addControlledDeviceSuccess({
              sceneId: a.payload.sceneId,
            })
          ),
          catchError(() => of(SceneActions.addControlledDeviceFail()))
        )
      )
    )
  );

  refreshSceneDetails = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.addControlledDeviceSuccess),
      map(({ sceneId }) => SceneActions.getSceneDetails({ id: sceneId }))
    )
  );

  updateSceneState = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateSceneState),
      switchMap((a) =>
        this.api.updateSceneState(a.id, a.state).pipe(
          map(() => SceneActions.updateSceneStateSuccess()),
          catchError(() =>
            of(SceneActions.undoUpdateSceneState({ state: !a.state }))
          )
        )
      )
    )
  );

  deleteScene = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.deleteScene),
      switchMap((a) =>
        this.api.deleteScene(a.id).pipe(
          map(() => SceneActions.deleteSceneSuccess()),
          catchError(() => of(SceneActions.deleteSceneFail()))
        )
      )
    )
  );

  handleDeleteSceneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SceneActions.deleteSceneSuccess),
        tap(() => this.router.navigate(['/', MainRoutes.Home]))
      ),
    { dispatch: false }
  );

  createScene = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.createScene),
      switchMap((a) =>
        this.api.createScene(a.payload).pipe(
          map(() => SceneActions.createSceneSuccess()),
          catchError(() => of(SceneActions.createSceneFail()))
        )
      )
    )
  );

  handleCreateSceneSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SceneActions.createSceneSuccess),
        tap(() => this.router.navigate(['/', MainRoutes.Home]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private api: SceneApiService,
    private eventBus: SceneEventBus,
    private router: Router
  ) {}
}
