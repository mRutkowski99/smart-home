import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SceneState } from './state/scene.reducer';
import * as SceneSelectors from './state/scene.selectors';
import { SceneActions } from './state/scene.actions';
import {
  UpdateControlledDeviceSetpointPayload,
  UpdateControlledDeviceStatePayload,
  UpdateSceneSchedulePayload,
} from '@smart-home/shared/scene/util-scene-payload';
import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';
import { first, map } from 'rxjs';

@Injectable()
export class SceneFacade {
  readonly sceneDetailsVm$ = this.store.select(
    SceneSelectors.sceneDetailsVmSelector
  );
  readonly deviceGroups$ = this.store.select(
    SceneSelectors.deviceGroupsSelector
  );

  constructor(private store: Store<SceneState>) {}

  getSceneDetails(id: string) {
    this.store.dispatch(SceneActions.getSceneDetails({ id }));
  }

  getDeviceGroups() {
    this.store.dispatch(SceneActions.getDevicesGroupedByRoom());
  }

  updateSchedule(
    id: string,
    newSchedule: UpdateSceneSchedulePayload,
    schedule: UpdateSceneSchedulePayload
  ) {
    this.store.dispatch(
      SceneActions.updateSceneSchedule({ id, schedule, newSchedule })
    );
  }

  updateControlledDeviceState(
    newState: UpdateControlledDeviceStatePayload,
    state: UpdateControlledDeviceStatePayload
  ) {
    this.store.dispatch(
      SceneActions.updateControlledDeviceState({ state, newState })
    );
  }

  updateControlledDeviceSetpoint(
    newSetpoint: UpdateControlledDeviceSetpointPayload,
    setpoint: UpdateControlledDeviceSetpointPayload
  ) {
    this.store.dispatch(
      SceneActions.updateControlledDeviceSetpoint({ setpoint, newSetpoint })
    );
  }

  removeControlledDevice(
    sceneId: string,
    deviceId: string,
    device: ControlledDeviceVm
  ) {
    this.store.dispatch(
      SceneActions.deleteControlledDevice({ sceneId, deviceId, device })
    );
  }

  addControlledDevice(sceneId: string, deviceId: string) {
    this.deviceGroups$
      .pipe(
        map((groups) => groups.map((group) => group.devices)),
        map((devices) => devices.reduce((acc, val) => acc.concat(val), [])),
        map((devices) => devices.find((device) => device.id === deviceId)),
        first()
      )
      .subscribe((device) => {
        if (device)
          this.store.dispatch(
            SceneActions.addControlledDevice({
              payload: {
                deviceId,
                sceneId,
                state: device.state,
                setpoint: device.setpoint,
                valueType: device.valueType,
              },
            })
          );
      });
  }
}
