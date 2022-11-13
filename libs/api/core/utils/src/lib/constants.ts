import * as dayjs from 'dayjs';

export const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();
