import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(relativeTime);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

export const dateString = d => dayjs(d).format('hh:mm A DD MMM YY');

export const relativeDate = d => {
  //   console.log({diff: });
  return dayjs(d).isToday() && dayjs(d).diff(dayjs(Date.now()), 'hour') < -3
    ? dayjs(d).format('hh:mm A')
    : dayjs(d).isToday()
    ? dayjs(d).fromNow()
    : dayjs(d).isSame(Date.now(), 'year')
    ? dayjs(d).format('hh:mm A DD MMM')
    : dayjs(d).format('hh:mm A DD MMM YY');
};
