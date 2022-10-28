//Exposes only hours and minutes from Date

export class Time {
  constructor(private readonly date: Date) {}

  toString(twelveHourFormat = false): string {
    if (twelveHourFormat) {
      return (
        this.twoDigitFormat(this.date.getHours() % 12) +
        ' ' +
        this.twoDigitFormat(this.date.getMinutes()) +
        ' ' +
        (this.date.getHours() < 12 ? 'AM' : 'PM')
      );
    }

    return (
      this.twoDigitFormat(this.date.getHours()) +
      ' ' +
      this.twoDigitFormat(this.date.getMinutes())
    );
  }

  private twoDigitFormat(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
