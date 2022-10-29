import { DayOfWeek } from '@smart-home/shared/utils';
import { RegexUtil } from '../regex';

//Utility class for CRON which exposes methods usefull in application

type CronField = 'minute' | 'hour' | 'day' | 'month' | 'weekday';

export class SceneCron {
  private readonly cronMap: Map<CronField, string>;

  constructor(private readonly _cron: string) {
    if (!RegexUtil.isValidSceneCron(_cron))
      throw new Error('Provide valid CRON');

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
    return this.cronMap
      .get('weekday')!
      .split(',')
      .map((weekday) => +weekday);
  }

  isDayOfWeekIncluded(weekday: DayOfWeek = new Date().getDay()): boolean {
    return this.cronMap
      .get('weekday')!
      .split(',')
      .some((wd) => +wd === weekday);
  }

  // Returns minute and hour as Date type with current day
  getAsDate(): Date {
    const date = new Date();
    date.setHours(this.hour);
    date.setMinutes(this.minute);

    return date;
  }

  static create(
    minute: number,
    hour: number,
    ...dayOfWeeks: DayOfWeek[]
  ): string {
    if (minute < 0 || minute > 59)
      throw new Error(`Invalid minutes - ${minute}`);

    if (hour < 0 || hour > 23) throw new Error(`Invalid hour - ${hour}`);

    return `${minute} ${hour} * * ${dayOfWeeks.join(',')}`;
  }
}
