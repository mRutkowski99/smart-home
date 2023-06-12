import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiControllerPrefix, getControllerUrl } from '@smart-home/shared/util';
import { Observable } from 'rxjs';
import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import {
  AddControlledDevicePayload,
  UpdateControlledDeviceSetpointPayload,
  UpdateControlledDeviceStatePayload,
  UpdateSceneSchedulePayload,
} from '@smart-home/shared/scene/util-scene-payload';
import { DeviceGroupVm } from '@smart-home/shared/device/util-device-vm';

@Injectable()
export class SceneApiService {
  private readonly sceneController = ApiControllerPrefix.Scene;
  private readonly deviceController = ApiControllerPrefix.Device;

  constructor(private http: HttpClient) {}

  getSceneDetails(id: string): Observable<SceneDetailsVm> {
    return this.http.get<SceneDetailsVm>(
      getControllerUrl(ApiControllerPrefix.Scene) + '/' + id
    );
  }

  getDeviceGroups(): Observable<DeviceGroupVm[]> {
    return this.http.get<DeviceGroupVm[]>(
      getControllerUrl(ApiControllerPrefix.Device) + '/grouped'
    );
  }

  updateSchedule(id: string, payload: UpdateSceneSchedulePayload) {
    return this.http.put(
      `${getControllerUrl(ApiControllerPrefix.Scene)}/schedule/${id}`,
      payload
    );
  }

  updateControlledDeviceState(payload: UpdateControlledDeviceStatePayload) {
    return this.http.put(
      `${getControllerUrl(ApiControllerPrefix.Scene)}/${
        payload.sceneId
      }/device-state`,
      payload
    );
  }

  updateControlledDeviceSetpoint(
    payload: UpdateControlledDeviceSetpointPayload
  ) {
    return this.http.put(
      `${getControllerUrl(ApiControllerPrefix.Scene)}/${
        payload.sceneId
      }/device-setpoint`,
      payload
    );
  }

  removeControlledDevice(sceneId: string, deviceId: string) {
    return this.http.delete(
      `${getControllerUrl(
        ApiControllerPrefix.Scene
      )}/${sceneId}/controlled-device/${deviceId}`
    );
  }

  addControlledDevice(payload: AddControlledDevicePayload) {
    return this.http.put(
      `${getControllerUrl(ApiControllerPrefix.Scene)}/${
        payload.sceneId
      }/device`,
      payload
    );
  }
}
