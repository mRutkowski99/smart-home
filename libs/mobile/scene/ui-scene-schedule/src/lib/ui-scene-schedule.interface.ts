import { DayOfWeek, Time } from '@smart-home/shared/util';

interface ScheduleDay {
  readonly dayOfWeek: DayOfWeek;
  readonly time: Time;
}

export interface UiSceneSchedule {
  readonly active: boolean;
  readonly days: ScheduleDay[];
}
