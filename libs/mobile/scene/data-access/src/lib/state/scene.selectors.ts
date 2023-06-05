import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SCENE_FEATURE_KEY, SceneState } from './scene.reducer';

const featureSelector = createFeatureSelector<SceneState>(SCENE_FEATURE_KEY);

export const sceneDetailsVmSelector = createSelector(
  featureSelector,
  (state) => ({
    scene: state.scene,
    status: state.status,
    error: state.sceneError,
  })
);
