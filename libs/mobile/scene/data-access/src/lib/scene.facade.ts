import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SceneState } from './state/scene.reducer';
import * as SceneSelectors from './state/scene.selectors';
import { SceneActions } from './state/scene.actions';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

@Injectable()
export class SceneFacade {
  readonly sceneDetailsVm$ = this.store.select(
    SceneSelectors.sceneDetailsVmSelector
  );

  constructor(private store: Store<SceneState>) {}

  getSceneDetails(id: string) {
    this.store.dispatch(SceneActions.getSceneDetails({ id }));
  }

  updateSchedule(
    id: string,
    newSchedule: UpdateSceneSchedulePayload,
    schedule: UpdateSceneSchedulePayload
  ) {
    this.store.dispatch(
      SceneActions.updateSceneSchedule({ id, schedule, newSchedule })
    );
  }
}
