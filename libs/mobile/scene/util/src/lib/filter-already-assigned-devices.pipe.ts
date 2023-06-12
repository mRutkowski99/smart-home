import { Pipe, PipeTransform } from '@angular/core';
import { DeviceVm } from '@smart-home/shared/device/util-device-vm';
import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';

@Pipe({ name: 'filterAlreadyAssignedDevices', standalone: true })
export class FilterAlreadyAssignedDevicesPipe implements PipeTransform {
  transform(
    value: DeviceVm[],
    assignedDevices: ControlledDeviceVm[]
  ): DeviceVm[] {
    return value.filter((device) =>
      assignedDevices.every(
        (assignedDevice) => assignedDevice.deviceId !== device.id
      )
    );
  }
}
