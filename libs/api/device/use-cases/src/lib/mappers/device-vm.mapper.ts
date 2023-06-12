import { Injectable } from '@nestjs/common';
import { Device } from '@smart-home/api/device/domain';
import { DeviceVm } from '@smart-home/shared/device/util-device-vm';

@Injectable()
export class DeviceVmMapper {
  map(domain: Device): DeviceVm {
    return {
      id: domain.id.value,
      setpoint: domain.setpoint,
      valueType: domain.valueType,
      state: domain.state,
      name: domain.name.value,
      roomId: domain.roomId.value,
    };
  }

  mapAll(domain: Device[]): DeviceVm[] {
    return domain.map(this.map);
  }
}
