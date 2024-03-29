import { DayOfWeek, Time } from '@smart-home/shared/util';
import { SceneScheduleDay } from './scene-schedule-day.model';
import { Uuid } from '@smart-home/api/shared/domain';

export class SceneSchedule {
  constructor(
    public readonly id: Uuid,
    public active: boolean,
    public days: SceneScheduleDay[]
  ) {}

  get todayTime(): Time | null {
    return (
      this.days.find((day) => day.dayOfWeek === new Date().getDay())?.time ??
      null
    );
  }

  isScheduledForDay(day: DayOfWeek): boolean {
    return (
      this.active &&
      this.days.some((scheduleDay) => scheduleDay.dayOfWeek === day)
    );
  }
}
