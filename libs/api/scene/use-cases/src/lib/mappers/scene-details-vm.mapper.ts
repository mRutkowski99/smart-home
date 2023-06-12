import { Injectable } from '@nestjs/common';
import {
  ControlledDevice,
  Scene,
  SceneSchedule,
} from '@smart-home/api/scene/domain';
import {
  ControlledDeviceVm,
  SceneDetailsVm,
  SceneScheduleVm,
} from '@smart-home/shared/scene/util-scene-vm';

@Injectable()
export class SceneDetailsVmMapper {
  map(domain: Scene): SceneDetailsVm {
    return {
      id: domain.id.value,
      name: domain.name.value,
      state: domain.state,
      schedule: this.mapSceneSchedule(domain.schedule),
      devices: domain.controlledDevices.map(this.mapControlledDevice),
    };
  }

  mapAll(domain: Scene[]): SceneDetailsVm[] {
    return domain.map(this.map);
  }

  private mapSceneSchedule(
    domain: SceneSchedule | null
  ): SceneScheduleVm | null {
    if (domain === null) return null;
    return {
      active: domain.active,
      days: domain.days.map((scheduleDay) => ({
        dayOfWeek: scheduleDay.dayOfWeek,
        time: { hours: scheduleDay.hours, minutes: scheduleDay.minutes },
      })),
    };
  }

  private mapControlledDevice(domain: ControlledDevice): ControlledDeviceVm {
    return {
      id: domain.id.value,
      deviceId: domain.deviceId.value,
      deviceName: domain.deviceName.value,
      valueType: domain.valueType,
      state: domain.state,
      setpoint: domain.setpoint,
      roomId: domain.roomId.value,
      roomName: domain.roomName.value,
    };
  }
}
