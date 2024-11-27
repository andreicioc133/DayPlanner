import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {COLORS, FONT_SIZES, ICON_SIZES} from '../utils/constants';
import {TouchableOpacity} from 'react-native';

const AddTaskButton = ({onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Add New Task</Text>
        <Icon
          source="plus"
          color={COLORS.lightGrey}
          size={ICON_SIZES.buttonIcon}
          style={{flex: 1}}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    marginTop: Platform?.isPad ? 18 : 15,
    marginBottom: Platform?.isPad ? 18 : 10,
    borderRadius: 50,
    height: Platform?.isPad ? 75 : 50,
    width: Platform?.isPad ? '50%' : '95%',
    paddingLeft: 8,
    paddingRight: 10,
  },
  text: {
    flex: 1,
    color: COLORS.lightGrey,
    paddingLeft: 10,
    fontSize: FONT_SIZES?.text,
  },
});

export default AddTaskButton;
