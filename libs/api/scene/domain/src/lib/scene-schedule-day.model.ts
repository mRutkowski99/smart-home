import { DayOfWeek, Time } from '@smart-home/shared/util';

export class SceneScheduleDay {
  constructor(
    public readonly dayOfWeek: DayOfWeek,
    public readonly hours: number,
    public readonly minutes: number
  ) {
    if (hours < 0 || hours > 23) throw new Error('Invalid hour');
    if (minutes < 0 || minutes > 59) throw new Error('Invalid minutes');
  }

  get time(): Time {
    return { hours: this.hours, minutes: this.minutes };
  }
}
