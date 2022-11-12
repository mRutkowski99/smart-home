import * as dayjs from 'dayjs';
import { FilterFromParam } from './types';

export function checkEnumKey(
  enumType: { [s: number]: string },
  key: string
): boolean {
  return Object.keys(enumType).some((enumKey) => enumKey === key);
}

export function getFilterDate(param: FilterFromParam): Date {
  if (param === 'lastThreeMonths') return dayjs().subtract(3, 'month').toDate();
  else if (param === 'lastMonth') return dayjs().subtract(1, 'month').toDate();
  else return dayjs().subtract(1, 'week').toDate();
}
