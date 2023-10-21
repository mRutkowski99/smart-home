import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneApiService } from '../api/scene-api.service';
import * as SceneActions from './scene.actions';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class SceneEffects {
    private getSceneOverview = createEffect(() => this.actions$.pipe(
        ofType(SceneActions.getScenesOverview),
        switchMap(a => this.api.getScenesOverview().pipe(
            map(scenes =>  SceneActions.getScenesOverviewSuccess({scenes})),
            catchError(() => of(SceneActions.getScenesOverviewFail({error: 'Connection error. Please try again'})))
        ))
    ))

    private updateSceneState = createEffect(() => this.actions$.pipe(
        ofType(SceneActions.updateSceneState),
        switchMap(a => this.api.updateSceneState(a.id, a.state).pipe(
            map(() => SceneActions.updateSceneStateSuccess()),
            catchError(() => of(SceneActions.undoUpdateSceneState({id: a.id, state: a.state})))
        ))
    ))

  constructor(private actions$: Actions, private api: SceneApiService) {}
}
