import { Scene, SceneScheduleDay } from '@smart-home/api/scene/domain';
import { Device } from '@smart-home/api/device/domain';
import { SceneUpdatedEvent } from '@smart-home/shared/scene/util-scene-event';
import { ControlledValue } from '@prisma/client';

const createCron = (scheduleDay: SceneScheduleDay): string =>
  `0 ${scheduleDay.minutes} ${scheduleDay.hours} * * ${scheduleDay.dayOfWeek}`;

export const sceneUpdatedEventMapper = (
  homeId: string,
  scene: Scene,
  devices: Device[]
): SceneUpdatedEvent => ({
  homeId,
  sceneId: scene.id.value,
  scheduleActivated: scene.schedule?.active ?? false,
  cron: scene.schedule?.days.map(createCron) ?? [],
  jobs: scene.controlledDevices.map((d) => {
    const stateAddress = devices
      .find((x) => x.id.value === d.deviceId.value)!
      .getAddress(ControlledValue.WRITE_STATE);
    const setpointAddress = devices
      .find((x) => x.id.value === d.deviceId.value)!
      .getAddress(ControlledValue.WRITE_SETPOINT);
    return {
      deviceId: d.deviceId.value,
      state: {
        value: d.state,
        address: stateAddress.address,
      },
      setpoint: {
        value: d.setpoint,
        address: setpointAddress.address,
        addressType: setpointAddress.addressType,
      },
    };
  }),
});
