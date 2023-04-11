import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percent', standalone: true })
export class PercentPipe implements PipeTransform {
  transform(value: number | null): string | null {
    if (value === null) return null;
    return Math.round(value) + '%';
  }
}
