import { SceneOverviewVm } from '@smart-home/shared/scene/util-scene-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './scene.actions';

export const SHARED_SCENE_FEATURE_KEY = 'sharedScene';

export interface SharedSceneState {
  scenes: SceneOverviewVm[];
  status: StoreStatus;
  error: string | null;
}

const initialState: SharedSceneState = {
  scenes: [],
  status: 'loading',
  error: null,
};

export const sceneReducer = createReducer(
  initialState,
  on(Actions.getScenesOverview, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(Actions.getScenesOverviewSuccess, (state, { scenes }) => ({
    ...state,
    status: 'success',
    scenes,
  })),
  on(Actions.getScenesOverviewFail, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),
  on(Actions.updateSceneState, (state, { id, state: value }) => ({
    ...updateSceneState(state, id, value),
  })),
  on(Actions.undoUpdateSceneState, (state, { id, state: value }) => ({
    ...updateSceneState(state, id, value),
  }))
);

const updateSceneState = (
  state: SharedSceneState,
  id: string,
  value: boolean
): SharedSceneState => {
  return {
    ...state,
    scenes: state.scenes.map((scene) =>
      scene.id === id ? { ...scene, state: value } : scene
    ),
  };
};
