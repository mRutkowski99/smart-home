import { DayOfWeek } from '@smart-home/shared/util';

type CronField = 'minute' | 'hour' | 'day' | 'month' | 'weekday';

// For scene user defines hour, minute and days of week (separated by comma if more than 1)
// so these values are necessary.
export class SceneCron {
  private readonly cronMap: Map<CronField, string>;

  constructor(private readonly _cron: string) {
    if (!this.isValidSceneCron(_cron))
      throw new Error('Provide valid scene CRON');

    const cronArray = this._cron.split(' ');
    this.cronMap = new Map<CronField, string>([
      ['minute', cronArray[0]],
      ['hour', cronArray[1]],
      ['day', cronArray[2]],
      ['month', cronArray[3]],
      ['weekday', cronArray[4]],
    ]);
  }

  get raw(): string {
    return this._cron;
  }

  get minute(): number {
    return +this.cronMap.get('minute')!;
  }

  get hour(): number {
    return +this.cronMap.get('hour')!;
  }

  get weekdays(): DayOfWeek[] {
    const weekdays = this.cronMap.get('weekday')!;

    if (weekdays.includes(''))
      return weekdays.split(',').map((weekday) => +weekday);
    else return [+weekdays];
  }

  static create(minute: number, hour: number, dayOfWeeks: DayOfWeek[]): string {
    if (minute < 0 || minute > 59)
      throw new Error(`Invalid minute - ${minute}`);

    if (hour < 0 || hour > 23) throw new Error(`Invalid hour - ${hour}`);

    return `${minute} ${hour} * * ${
      new Set(dayOfWeeks).size === 7 ? '*' : dayOfWeeks.join(',')
    }`;
  }

  isDayOfWeekIncluded(weekday: DayOfWeek = new Date().getDay()): boolean {
    return this.weekdays.some((wd) => +wd === weekday);
  }

  private isValidSceneCron(value: string): boolean {
    const arr = value.split(' ');
    if (arr.length !== 5) return false;

    const minute = arr[0];
    if (+minute < 0 || +minute > 59 || isNaN(+minute)) return false;

    const hour = arr[1];
    if (+hour < 0 || +hour > 23 || isNaN(+hour)) return false;

    if (arr[2] !== '*' || arr[3] !== '*') return false;

    const weekdays = arr[4];
    if (weekdays.includes(',')) {
      const weekdaysArr = weekdays.split(',');

      if (weekdaysArr.length < 2 || weekdaysArr.length > 7) return false;

      if (!weekdaysArr.every((char) => +char >= 0 && +char <= 6)) return false;

      if (new Set(weekdaysArr).size !== weekdaysArr.length) return false;

      return true;
    } else return !isNaN(+weekdays) && +weekdays >= 0 && +weekdays <= 6;
  }
}
