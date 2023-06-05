import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from './scene.actions';

export const SCENE_FEATURE_KEY = 'scene';

export interface SceneState {
  scene: SceneDetailsVm | null;
  status: StoreStatus;
  sceneError: string | null;
}

const initialState: SceneState = {
  scene: null,
  status: 'loading',
  sceneError: null,
};

export const sceneReducer = createReducer(
  initialState,
  on(SceneActions.getSceneDetails, (state) => ({
    ...state,
    status: 'loading',
    sceneError: null,
  })),
  on(SceneActions.getSceneDetailsSuccess, (state, { scene }) => ({
    ...state,
    status: 'success',
    scene,
  })),
  on(SceneActions.getSceneDetailsError, (state, { error }) => ({
    ...state,
    status: 'error',
    sceneError: error,
  }))
);
