export class RegexUtil {
  // For scene user defines hour, minute and days of week (separated by comma if more than 1)
  // so these values are necessary.
  static isValidSceneCron(value: string): boolean {
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
    } else return +weekdays >= 0 && +weekdays <= 6;
  }
}
