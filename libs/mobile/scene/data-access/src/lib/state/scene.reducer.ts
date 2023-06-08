import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from './scene.actions';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

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
  })),
  on(SceneActions.updateSceneSchedule, (state, { newSchedule }) => ({
    ...state,
    scene: updateSceneSchedule(state.scene, newSchedule),
  })),
  on(SceneActions.undoUpdateSceneSchedule, (state, { schedule }) => ({
    ...state,
    scene: updateSceneSchedule(state.scene, schedule),
  }))
);

const updateSceneSchedule = (
  scene: SceneDetailsVm | null,
  schedule: UpdateSceneSchedulePayload
): SceneDetailsVm | null => {
  if (scene === null) return null;
  return {
    ...scene,
    schedule: {
      active: schedule.active,
      days: schedule.days,
    },
  };
};
