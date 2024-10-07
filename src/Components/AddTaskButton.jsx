import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';
import {COLORS, ICON_SIZES} from '../utils/constants';
import {TouchableOpacity} from 'react-native';

const AddTaskButton = ({onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Add New Task</Text>
        <Icon
          source="plus"
          color={COLORS.white}
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
    // backgroundColor: COLORS.tertiaryColor,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: 28,
    borderRadius: 50,
    height: 50,
    width: '95%',
    paddingLeft: 8,
    paddingRight: 10,
  },
  text: {
    flex: 1,
    color: COLORS.white,
    paddingLeft: 10,
  },
});

export default AddTaskButton;