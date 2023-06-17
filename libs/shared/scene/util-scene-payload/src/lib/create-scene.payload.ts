import { UpdateSceneSchedulePayload } from '../lib/update-scene-schedule.payload';

export interface CreateScenePayload {
  readonly name: string;
  readonly devices: { deviceId: string; setpoint: number; state: boolean }[];
  schedule: UpdateSceneSchedulePayload;
}
