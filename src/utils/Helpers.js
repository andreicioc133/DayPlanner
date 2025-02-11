import moment from 'moment';
import {Platform, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {getAllKeys, removeValue} from './StorageFunctions';

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

export const deletePreviousTasks = async () => {
  const keys = await getAllKeys();

  keys?.map(key => {
    const dateFromKey = moment(new Date(key.substring(0, 33))).format('L');
    if (dateFromKey <= moment(new Date()).subtract(1, 'days').format('L')) {
      removeValue(key);
      Alert.alert('Older tasks have been removed!');
    }
  });
};
