import dayjs from 'dayjs';

export const timestampToDate = (
  timestamp: number | string,
  format = 'DD/MM/YYYY',
  fullTimestamp = false
) => {
  const parsedTS = Number(timestamp);
  if (typeof parsedTS !== 'number') return '-';
  if (fullTimestamp) return dayjs(parsedTS).format(format);
  return dayjs(Number(parsedTS) * 1000).format(format);
};
