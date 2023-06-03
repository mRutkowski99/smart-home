import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedSceneState } from './state/scene.reducer';
import * as Selectors from './state/scene.selectors';
import * as Actions from './state/scene.actions';

@Injectable()
export class SharedSceneFacade {
  scenesOverviewVm$ = this.store.select(Selectors.scenesOverviewVmSelector);

  constructor(private store: Store<SharedSceneState>) {}

  getScenesOverview() {
    this.store.dispatch(Actions.getScenesOverview());
  }

  updateSceneState(id: string, state: boolean) {
    this.store.dispatch(Actions.updateSceneState({ id, state }));
  }
}
