import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log('Error set data in async storage: ', err);
  }
};

export const setObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log('Error set object data in async storage: ', err);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('Error get data in async storage: ', err);
  }
};

export const getObjectData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log('json object value: ', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error get object data in async storage: ', err);
  }
};

export const getMultipleObjectData = async keys => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log('Error get multi object data in async storage: ', err);
  }
  console.log(values);
};

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (err) {
    console.log('Error retrieving all keys: ', err);
  }
  console.log('keys in func: ', keys);
  return keys;
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }

  console.log('Done clearing storage.');
};
