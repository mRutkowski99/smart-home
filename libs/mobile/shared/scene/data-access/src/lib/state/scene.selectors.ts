import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHARED_SCENE_FEATURE_KEY, SharedSceneState } from './scene.reducer';

export const featureSelector = createFeatureSelector<SharedSceneState>(
  SHARED_SCENE_FEATURE_KEY
);

export const scenesOverviewVmSelector = createSelector(
  featureSelector,
  (state) => ({
    scenes: state.scenes,
    status: state.status,
    error: state.error,
  })
);
