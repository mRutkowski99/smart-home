import { SceneCron, Time } from '@smart-home/api/core/utils';

export class Schedule {
  private readonly _cron: SceneCron;

  constructor(_cron: string, private readonly _expireDate: Date) {
    this._cron = new SceneCron(_cron);
  }

  get cron(): SceneCron {
    return this._cron;
  }

  get expireDate(): Date {
    return this._expireDate;
  }

  get isExpired(): boolean {
    return new Date() > this._expireDate;
  }

  get todaySchedule(): Time | null {
    if (this.isExpired) return null;
    if (!this.cron.isDayOfWeekIncluded()) return null;
    return new Time(this.cron.getAsDate());
  }
}
