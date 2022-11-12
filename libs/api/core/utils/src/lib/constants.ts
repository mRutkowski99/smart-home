import dayjs = require('dayjs');

export const threeMonthsAgo = dayjs().subtract(3, 'month').toDate();
