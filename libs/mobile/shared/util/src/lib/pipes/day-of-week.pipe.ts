import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '@smart-home/shared/util';

@Pipe({
  name: 'dayOfWeek',
  standalone: true,
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: DayOfWeek): string {
    switch (value) {
      case DayOfWeek.Monday:
        return 'MON';
      case DayOfWeek.Tuesday:
        return 'TUE';
      case DayOfWeek.Wednesday:
        return 'WED';
      case DayOfWeek.Thursday:
        return 'THUR';
      case DayOfWeek.Friday:
        return 'FRI';
      case DayOfWeek.Saturday:
        return 'SAT';
      case DayOfWeek.Sunday:
        return 'SUN';
      default:
        return '';
    }
  }
}
