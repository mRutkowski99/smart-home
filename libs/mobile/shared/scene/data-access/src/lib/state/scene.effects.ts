import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneApiService } from '../api/scene-api.service';
import * as SceneActions from './scene.actions';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs';

@Injectable()
export class SceneEffects {
  getScenesOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.getScenesOverview),
      fetch({
        run: () =>
          this.api
            .getScenesOverview()
            .pipe(
              map((scenes) => SceneActions.getScenesOverviewSuccess({ scenes }))
            ),
        onError: () =>
          SceneActions.getScenesOverviewFail({
            error: 'Connection error. Please try again',
          }),
      })
    )
  );

  updateSceneState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SceneActions.updateSceneState),
      optimisticUpdate({
        run: ({ id, state }) =>
          this.api
            .updateSceneState(id, state)
            .pipe(map(() => SceneActions.updateSceneStateSuccess())),
        undoAction: ({ id, state }) =>
          SceneActions.undoUpdateSceneState({ id, state: !state }),
      })
    )
  );

  constructor(private actions$: Actions, private api: SceneApiService) {}
}
