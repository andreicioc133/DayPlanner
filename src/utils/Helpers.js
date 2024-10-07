import moment from 'moment';

export const addMinutesToDate = (date, value) => {
  const endTime = moment(date).add(value, 'minutes');
  return new Date(endTime);
};

export const formatToLocalTime = date => {
  const time = moment.utc(date).local().format('h:mm a');
  return time;
};

export const createKeyFromDateObject = dateObj => {
  return dateObj.toString();
};
