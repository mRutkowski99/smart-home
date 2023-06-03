import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@smart-home/shared/util';

type TimeFormat = 'HH:mm' | 'H:m' | 'HH:mm a' | 'H:m a';

@Pipe({ name: 'time', standalone: true })
export class TimePipe implements PipeTransform {
  transform(
    time: Time | undefined | null,
    format: TimeFormat = 'HH:mm'
  ): string {
    if (!time) return '';
    const { hours, minutes } = time;
    return `${this.formatHours(hours, format)}:${this.formatMinutes(
      minutes,
      format
    )} ${this.formatAmPm(hours, format)}`;
  }

  private formatHours(hours: number, format: TimeFormat): string {
    const formatedHours =
      format.includes('a') && hours > 12 ? hours - 12 : hours;
    return format.startsWith('HH')
      ? formatedHours.toString().padStart(2, '0')
      : formatedHours.toString();
  }

  private formatMinutes(minutes: number, format: TimeFormat): string {
    return format.includes('mm')
      ? minutes.toString().padStart(2, '0')
      : minutes.toString();
  }

  private formatAmPm(hours: number, format: TimeFormat): string {
    if (!format.includes('a')) return '';

    return hours > 12 ? 'PM' : 'AM';
  }
}
