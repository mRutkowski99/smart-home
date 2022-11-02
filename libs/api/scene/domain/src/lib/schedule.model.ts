import { SceneCron } from '@smart-home/api/core/utils';

export class Schedule {
  private readonly _cron: SceneCron;

  constructor(_cron: string, private readonly _expireDate: Date | null) {
    this._cron = new SceneCron(_cron);
  }

  get cron(): SceneCron {
    return this._cron;
  }

  get expireDate(): Date | null {
    return this._expireDate;
  }

  get isExpired(): boolean {
    return this._expireDate !== null && new Date() > this._expireDate;
  }

  get todaySchedule(): Date | null {
    if (this.isExpired) return null;
    if (!this.cron.isDayOfWeekIncluded()) return null;
    return this.cron.getAsDate();
  }
}
