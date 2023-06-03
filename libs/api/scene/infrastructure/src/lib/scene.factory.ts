import { SceneScheduleSchema, SceneSchema, ValueType } from '@prisma/client';
import {
  ControlledDevice,
  Scene,
  SceneSchedule,
} from '@smart-home/api/scene/domain';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';

type SceneFactoryInput = SceneSchema & {
  schedule: SceneScheduleSchema | null;
  controlledDevices: {
    id: string;
    setpoint: number;
    state: boolean;
    device: {
      id: string;
      valueType: ValueType;
    };
  }[];
};

export function sceneFactory(schema: SceneFactoryInput): Scene {
  return new Scene(
    new Uuid(schema.id),
    new Uuid(schema.homeId),
    new Name(schema.name),
    schema.state,
    schema.schedule
      ? new SceneSchedule(
          schema.schedule.active,
          {
            hours: schema.schedule.startTimeHours,
            minutes: schema.schedule.startTimeMinutes,
          },
          schema.schedule.daysOfWeek
        )
      : null,
    schema.controlledDevices.map((cd) =>
      controlledDeviceFactory(
        cd.id,
        cd.device.id,
        cd.device.valueType,
        cd.setpoint,
        cd.state
      )
    )
  );
}

function controlledDeviceFactory(
  id: string,
  deviceId: string,
  valueType: ValueType,
  setpoint: number,
  state: boolean
): ControlledDevice {
  return new ControlledDevice(
    new Uuid(id),
    new Uuid(deviceId),
    deviceValueTypeMapper(valueType),
    setpoint,
    state
  );
}
