import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek, Time } from '@smart-home/shared/util';

@Pipe({ name: 'hasAssignedTime', standalone: true })
export class HasAssignedTimePipe implements PipeTransform {
  transform(
    day: DayOfWeek,
    schedule: {
      dayOfWeek: DayOfWeek;
      time: Time | null;
    }[]
  ): boolean {
    return !!schedule.find((schedule) => schedule.dayOfWeek === day)?.time;
  }
}
