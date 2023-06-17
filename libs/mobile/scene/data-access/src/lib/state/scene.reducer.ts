import {
  ControlledDeviceVm,
  SceneDetailsVm,
} from '@smart-home/shared/scene/util-scene-vm';
import { StoreStatus } from '@smart-home/shared/util';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from './scene.actions';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';
import { DeviceGroupVm } from '@smart-home/shared/device/util-device-vm';

export const SCENE_FEATURE_KEY = 'scene';

export interface SceneState {
  scene: SceneDetailsVm | null;
  status: StoreStatus;
  sceneError: string | null;
  devices: DeviceGroupVm[];
}

const initialState: SceneState = {
  scene: null,
  status: 'loading',
  sceneError: null,
  devices: [],
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
  })),
  on(SceneActions.updateControlledDeviceState, (state, { newState }) => ({
    ...state,
    scene: updateControlledDeviceState(
      state.scene,
      newState.deviceId,
      newState.state
    ),
  })),
  on(
    SceneActions.undoUpdateControlledDeviceState,
    (state, { state: deviceState }) => ({
      ...state,
      scene: updateControlledDeviceState(
        state.scene,
        deviceState.deviceId,
        deviceState.state
      ),
    })
  ),
  on(SceneActions.updateControlledDeviceSetpoint, (state, { newSetpoint }) => ({
    ...state,
    scene: updateControlledDeviceSetpoint(
      state.scene,
      newSetpoint.deviceId,
      newSetpoint.setpoint
    ),
  })),
  on(
    SceneActions.undoUpdateControlledDeviceSetpoint,
    (state, { setpoint }) => ({
      ...state,
      scene: updateControlledDeviceSetpoint(
        state.scene,
        setpoint.deviceId,
        setpoint.setpoint
      ),
    })
  ),
  on(SceneActions.deleteControlledDevice, (state, { deviceId }) => ({
    ...state,
    scene: removeControlledDevice(state.scene, deviceId),
  })),
  on(SceneActions.undoDeleteControlledDevice, (state, { device }) => ({
    ...state,
    scene: addControlledDevice(state.scene, device),
  })),
  on(SceneActions.getDevicesGroupedByRoomSuccess, (state, { devices }) => ({
    ...state,
    devices,
  })),
  on(SceneActions.addControlledDevice, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(SceneActions.addControlledDeviceSuccess, (state) => ({
    ...state,
    status: 'success',
  })),
  on(SceneActions.addControlledDeviceFail, (state) => ({
    ...state,
    status: 'success',
  })),
  on(SceneActions.updateSceneState, (state, { state: sceneState }) => ({
    ...state,
    scene: updateSceneState(state.scene, sceneState),
  })),
  on(SceneActions.undoUpdateSceneState, (state, { state: sceneState }) => ({
    ...state,
    scene: updateSceneState(state.scene, sceneState),
  }))
);

const updateSceneState = (
  scene: SceneDetailsVm | null,
  state: boolean
): SceneDetailsVm | null => {
  if (scene === null) return null;
  else return { ...scene, state };
};

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

const updateControlledDeviceState = (
  scene: SceneDetailsVm | null,
  deviceId: string,
  state: boolean
): SceneDetailsVm | null => {
  if (scene === null) return null;
  return {
    ...scene,
    devices: scene.devices.map((device) =>
      device.deviceId === deviceId ? { ...device, state } : device
    ),
  };
};

const updateControlledDeviceSetpoint = (
  scene: SceneDetailsVm | null,
  deviceId: string,
  setpoint: number
): SceneDetailsVm | null => {
  if (scene === null) return null;
  return {
    ...scene,
    devices: scene.devices.map((device) =>
      device.deviceId === deviceId ? { ...device, setpoint } : device
    ),
  };
};

const removeControlledDevice = (
  scene: SceneDetailsVm | null,
  deviceId: string
): SceneDetailsVm | null => {
  if (scene === null) return null;
  return {
    ...scene,
    devices: scene.devices.filter((device) => device.deviceId !== deviceId),
  };
};

const addControlledDevice = (
  scene: SceneDetailsVm | null,
  device: ControlledDeviceVm
): SceneDetailsVm | null => {
  if (scene === null) return null;
  return {
    ...scene,
    devices: [...scene.devices, device],
  };
};
