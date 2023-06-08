import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

export const SceneActions = createActionGroup({
  source: 'Scene',
  events: {
    'Get Scene Details': props<{ id: string }>(),
    'Get Scene Details Success': props<{ scene: SceneDetailsVm }>(),
    'Get Scene Details Error': props<{ error: string }>(),
    'Update Scene Schedule': props<{
      id: string;
      newSchedule: UpdateSceneSchedulePayload;
      schedule: UpdateSceneSchedulePayload;
    }>(),
    'Update Scene Schedule Success': emptyProps(),
    'Undo Update Scene Schedule': props<{
      id: string;
      schedule: UpdateSceneSchedulePayload;
    }>(),
  },
});
