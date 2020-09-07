import moment from 'moment';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

function get(unit: moment.unitOfTime.All) {
  return moment().get(unit);
}

export function getYear() {
  return get('year');
}

export function getMonth() {
  return get('month') + 1;
}

export function getDay() {
  return get('date');
}

export function getDayOfWeek() {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][get('day')];
}

export function getHour() {
  return get('hour');
}

export function getMinute() {
  return get('minute');
}

export function getSecond() {
  return get('second');
}

export function getToday() {
  return moment().format(DEFAULT_FORMAT);
}

export function getDateFromToday(amount: moment.DurationInputArg1, unit?: moment.DurationInputArg2) {
  return moment()
    .add(amount, unit)
    .format(DEFAULT_FORMAT);
}

export function formater(date: Date | string, format = DEFAULT_FORMAT) {
  return moment(date).format(format);
}
