import { SceneSchema, ValueType } from '@prisma/client';
import {
  ControlledDevice,
  Scene,
  SceneSchedule,
  SceneScheduleDay,
} from '@smart-home/api/scene/domain';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';
import * as crypto from "crypto";

type SceneFactoryInput = SceneSchema & {
  schedule: {
    id: string;
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
      room: {
        id: string;
        name: string;
      } | null;
    };
  }[];
};

export function sceneFactory(schema: SceneFactoryInput): Scene {
  return new Scene(
    new Uuid(schema.id),
    new Uuid(schema.homeId),
    new Name(schema.name),
    schema.state,
    sceneScheduleFactory(schema.schedule) ?? new SceneSchedule(new Uuid(crypto.randomUUID()), false, []),
    schema.controlledDevices.map((cd) =>
      controlledDeviceFactory(
        cd.id,
        cd.device.id,
        cd.device.name,
        cd.device.valueType,
        cd.setpoint,
        cd.state,
        cd.device.room!.id,
        cd.device.room!.name
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
  state: boolean,
  roomId: string,
  roomName: string
): ControlledDevice {
  return new ControlledDevice(
    new Uuid(id),
    new Uuid(deviceId),
    new Name(name),
    new Uuid(roomId),
    new Name(roomName),
    deviceValueTypeMapper(valueType),
    setpoint,
    state
  );
}

function sceneScheduleFactory(
  schedule: {
    id: string;
    active: boolean;
    scheduleDays: {
      dayOfWeek: number;
      startTimeHours: number;
      startTimeMinutes: number;
    }[];
  } | null
): SceneSchedule | null {
  if (!schedule) return null
  return new SceneSchedule(
    new Uuid(schedule.id),
    schedule.active,
    schedule.scheduleDays.map(
      (x) =>
        new SceneScheduleDay(x.dayOfWeek, x.startTimeHours, x.startTimeMinutes)
    )
  );
}
