import { createAction, props } from '@ngrx/store';
import { SceneOverviewVm } from '@smart-home/shared/scene/util-scene-vm';

enum Types {
  GetScenesOverview = '[Shared Scene] Get Scenes Overview',
  GetScenesOverviewSuccess = '[Shared Scene] Get Scenes Overview Success',
  GetScenesOverviewFail = '[Shared Scene] Get Scenes Overview Fail',
  UpdateSceneState = '[Shared Scene] Update Scene State',
  UpdateSceneStateSuccess = '[Shared Scene] Update Scene State Success',
  UndoUpdateSceneState = '[Shared Scene] Undo Update Scene State',
}

export const getScenesOverview = createAction(Types.GetScenesOverview);
export const getScenesOverviewSuccess = createAction(
  Types.GetScenesOverviewSuccess,
  props<{ scenes: SceneOverviewVm[] }>()
);
export const getScenesOverviewFail = createAction(
  Types.GetScenesOverviewFail,
  props<{ error: string }>()
);

export const updateSceneState = createAction(
  Types.UpdateSceneState,
  props<{ id: string; state: boolean }>()
);
export const updateSceneStateSuccess = createAction(
  Types.UpdateSceneStateSuccess
);
export const undoUpdateSceneState = createAction(
  Types.UndoUpdateSceneState,
  props<{ id: string; state: boolean }>()
);
