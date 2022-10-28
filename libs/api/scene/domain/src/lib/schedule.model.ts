import { AppCron, Time } from '@smart-home/api/core/utils';

export class Schedule {
  private readonly _cron: AppCron;

  constructor(_cron: string, private readonly _expireDate: Date) {
    this._cron = new AppCron(_cron);
  }

  get cron(): AppCron {
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
