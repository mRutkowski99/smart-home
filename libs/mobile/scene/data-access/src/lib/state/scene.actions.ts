import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ControlledDeviceVm,
  SceneDetailsVm,
} from '@smart-home/shared/scene/util-scene-vm';
import {
  AddControlledDevicePayload,
  CreateScenePayload,
  UpdateControlledDeviceSetpointPayload,
  UpdateControlledDeviceStatePayload,
  UpdateSceneSchedulePayload,
} from '@smart-home/shared/scene/util-scene-payload';
import { DeviceGroupVm } from '@smart-home/shared/device/util-device-vm';

export const SceneActions = createActionGroup({
  source: 'Scene',
  events: {
    'Get Scene Details': props<{ id: string }>(),
    'Get Scene Details Success': props<{ scene: SceneDetailsVm }>(),
    'Get Scene Details Error': props<{ error: string }>(),
    'Get Devices Grouped By Room': emptyProps(),
    'Get Devices Grouped By Room Success': props<{
      devices: DeviceGroupVm[];
    }>(),
    'Get Devices Grouped By Room Fail': props<{ error: string }>(),
    'Update Scene State': props<{ id: string; state: boolean }>(),
    'Update Scene State Success': emptyProps(),
    'Undo Update Scene State': props<{ state: boolean }>(),
    'Delete Scene': props<{ id: string }>(),
    'Delete Scene Success': emptyProps(),
    'Delete Scene Fail': emptyProps(),
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
    'Update Controlled Device State': props<{
      newState: UpdateControlledDeviceStatePayload;
      state: UpdateControlledDeviceStatePayload;
    }>(),
    'Update Controlled Device State Success': emptyProps(),
    'Undo Update Controlled Device State': props<{
      state: UpdateControlledDeviceStatePayload;
    }>(),
    'Update Controlled Device Setpoint': props<{
      newSetpoint: UpdateControlledDeviceSetpointPayload;
      setpoint: UpdateControlledDeviceSetpointPayload;
    }>(),
    'Update Controlled Device Setpoint Success': emptyProps(),
    'Undo Update Controlled Device Setpoint': props<{
      setpoint: UpdateControlledDeviceSetpointPayload;
    }>(),
    'Delete Controlled Device': props<{
      sceneId: string;
      deviceId: string;
      device: ControlledDeviceVm;
    }>(),
    'Delete Controlled Device Success': emptyProps(),
    'Undo Delete Controlled Device': props<{ device: ControlledDeviceVm }>(),
    'Add Controlled Device': props<{ payload: AddControlledDevicePayload }>(),
    'Add Controlled Device Success': props<{ sceneId: string }>(),
    'Add Controlled Device Fail': emptyProps(),
    'Create Scene': props<{ payload: CreateScenePayload }>(),
    'Create Scene Success': emptyProps(),
    'Create Scene Fail': emptyProps(),
  },
});
