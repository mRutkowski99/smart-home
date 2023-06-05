import { SceneSchema, ValueType } from '@prisma/client';
import {
  ControlledDevice,
  Scene,
  SceneSchedule,
  SceneScheduleDay,
} from '@smart-home/api/scene/domain';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';

type SceneFactoryInput = SceneSchema & {
  schedule: {
    active: boolean;
    scheduleDays: {
      dayOfWeek: number;
      startTimeHours: number;
      startTimeMinutes: number;
    }[];
  } | null;
  controlledDevices: {
    id: string;
    setpoint: number;
    state: boolean;
    device: {
      id: string;
      name: string;
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
    schema.schedule ? sceneScheduleFactory(schema.schedule) : null,
    schema.controlledDevices.map((cd) =>
      controlledDeviceFactory(
        cd.id,
        cd.device.id,
        cd.device.name,
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
  name: string,
  valueType: ValueType,
  setpoint: number,
  state: boolean
): ControlledDevice {
  return new ControlledDevice(
    new Uuid(id),
    new Uuid(deviceId),
    new Name(name),
    deviceValueTypeMapper(valueType),
    setpoint,
    state
  );
}

function sceneScheduleFactory(schedule: {
  active: boolean;
  scheduleDays: {
    dayOfWeek: number;
    startTimeHours: number;
    startTimeMinutes: number;
  }[];
}): SceneSchedule {
  return new SceneSchedule(
    schedule.active,
    schedule.scheduleDays.map(
      (x) =>
        new SceneScheduleDay(x.dayOfWeek, x.startTimeHours, x.startTimeMinutes)
    )
  );
}
