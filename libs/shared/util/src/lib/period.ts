import * as dayjs from 'dayjs'

export type Period = 'week' | 'month' | 'year'

interface DatePeriod {
    from: Date;
    to: Date;
}
// export const currentWeek: DatePeriod = {
//     from: dayjs().startOf('week').toDate(),
//     to: dayjs().endOf('week').toDate()
// }
//
// export const currentMonth: DatePeriod = {
//     from: dayjs().startOf('month').toDate(),
//     to: dayjs().endOf('month').toDate()
// }
//
// export const currentYear: DatePeriod = {
//     from: dayjs().startOf('year').toDate(),
//     to: dayjs().endOf('year').toDate()
// }
//
// export const getPeriodDates = (period: Period): DatePeriod | null => {
//     if (period === 'week') return currentWeek
//     if (period === 'month') return currentMonth
//     if (period === 'year') return currentYear
//
//     return null
// }