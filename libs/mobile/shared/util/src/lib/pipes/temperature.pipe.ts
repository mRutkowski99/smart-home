import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'temperature', standalone: true })
export class TemperaturePipe implements PipeTransform {
  transform(value: number | null, fahrenheit?: boolean): string | null {
    if (value === null) return null;

    if (fahrenheit) return this.celsiusToFahrenheit(value) + ' °F';
    else return value + ' °C';
  }

  private celsiusToFahrenheit(value: number): number {
    return Math.round(value * 1.8 + 32);
  }
}
