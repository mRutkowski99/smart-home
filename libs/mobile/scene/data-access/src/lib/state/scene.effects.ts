import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from './scene.actions';
import { fetch } from '@nrwl/angular';
import { SceneApiService } from '../api/scene-api.service';
import { map } from 'rxjs';

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

  constructor(private actions$: Actions, private api: SceneApiService) {}
}
