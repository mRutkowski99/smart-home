import { DayOfWeek, Time } from '@smart-home/shared/util';

export interface UpdateSceneSchedulePayload {
  active: boolean;
  days: { dayOfWeek: DayOfWeek; time: Time }[];
}
