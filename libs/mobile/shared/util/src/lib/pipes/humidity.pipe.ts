import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'humidity', standalone: true })
export class HumidityPipe implements PipeTransform {
  transform(value: number | null): string | null {
    if (value === null) return null;
    return value + ' %';
  }
}
