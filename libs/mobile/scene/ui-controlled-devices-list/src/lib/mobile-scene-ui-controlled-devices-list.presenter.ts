import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';
import {
  groupDevicesByRoom,
  GroupedDevices,
} from '@smart-home/mobile/scene/util';
import { UiDeviceCard } from '@smart-home/mobile/shared/device/ui-device-card';

@Injectable()
export class ControlledDevicesPresenter {
  private devices = new BehaviorSubject<ControlledDeviceVm[]>([]);
  groupedDevices$: Observable<GroupedDevices<ControlledDeviceVm>[]> =
    this.devices.pipe(map((device) => groupDevicesByRoom(device)));
  groupedDeviceCards$: Observable<GroupedDevices<UiDeviceCard>[]> =
    this.groupedDevices$.pipe(
      map((groupArray) =>
        groupArray.map((group) => ({
          room: group.room,
          devices: group.devices.map(this.mapToUiDeviceCard),
        }))
      )
    );
  devices$ = this.devices.asObservable();

  updateDevicesCollection(devices: ControlledDeviceVm[]) {
    this.devices.next(devices);
  }

  getDeviceState(deviceId: string): boolean | null {
    return (
      this.devices.getValue().find((device) => device.deviceId === deviceId)
        ?.state ?? null
    );
  }

  getDevice(deviceId: string): ControlledDeviceVm | null {
    return (
      this.devices.getValue().find((device) => deviceId === deviceId) ?? null
    );
  }

  private mapToUiDeviceCard(device: ControlledDeviceVm): UiDeviceCard {
    return {
      id: device.deviceId,
      state: device.state,
      name: device.deviceName,
      setpoint: device.setpoint,
      valueType: device.valueType,
    };
  }
}
