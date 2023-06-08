import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from './scene.actions';
import { fetch, optimisticUpdate } from '@nrwl/angular';
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

  constructor(
    private actions$: Actions,
    private api: SceneApiService,
    private eventBus: SceneEventBus
  ) {}
}
