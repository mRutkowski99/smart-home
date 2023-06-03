import { DayOfWeek, Time } from '@smart-home/shared/util';
import { SceneCron } from './scene-cron.model';

export class SceneSchedule {
  constructor(
    public readonly active: boolean,
    public readonly startTime: Time,
    private _daysOfWeek: string //numbers separated by '/'
  ) {}

  get daysOfWeek(): DayOfWeek[] {
    return this._daysOfWeek.split('/').map((x) => +x);
  }

  set daysOfWeek(days: DayOfWeek[]) {
    if (new Set(days).size !== days.length)
      throw new Error('Provided duplicates');

    this._daysOfWeek = days.sort((a, b) => (a > b ? 1 : -1)).join('/');
  }

  get cron(): string {
    return SceneCron.create(
      this.startTime.minutes,
      this.startTime.hours,
      this.daysOfWeek
    );
  }

  isScheduledForDay(day: DayOfWeek): boolean {
    return this.daysOfWeek.includes(day) && this.active;
  }
}
