import moment from 'moment';
import {Platform} from 'react-native';
import uuid from 'react-native-uuid';

export const addMinutesToDate = (date, value) => {
  const endTime = moment(date).add(value, 'minutes');
  return new Date(endTime);
};

export const formatToLocalTime = date => {
  const time = moment.utc(date).local().format('h:mm a');
  return time;
};

export const createKeyFromDateObject = dateObj => {
  const key = dateObj.toString() + ' ' + uuid.v4();
  return key;
};

export const renderBasedOnIpadOrientation = (valPortrait, valLandscape) => {
  return;
};
