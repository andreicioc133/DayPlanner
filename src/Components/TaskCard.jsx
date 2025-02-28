import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS, FONT_SIZES, ICON_SIZES} from '../utils/constants';
import {TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import {getAllKeys, setObjectData} from '../utils/StorageFunctions';

const TaskCard = ({
  title,
  description,
  taskDate,
  startTime,
  endTime,
  storageKey,
  onTaskDelete,
  isTaskAllDay,
  hasNoEndTime,
  plan,
}) => {
  const [isChecked, setIsChecked] = useState(plan?.isChecked);
  const [isExpanded, setIsExpanded] = useState(false);

  const onCheck = () => {
    setIsChecked(!isChecked);
  };

  const updatePlan = async () => {
    const keys = await getAllKeys();
    if (keys.includes(storageKey)) {
      let newplan = {...plan, isChecked: isChecked};
      await setObjectData(storageKey, newplan);
    }
  };

  useEffect(() => {
    updatePlan();
  }, [isChecked]);

  return (
    <>
      <TouchableOpacity
        key={uuid.v4()}
        style={{
          ...styles.container,
          borderColor: isChecked ? COLORS.validGreen : COLORS.lightGrey,
          borderBottomWidth: 0.5,
          borderTopWidth: 2.5,
          borderLeftWidth: 1,
          borderRightWidth: 1,
        }}
        onPress={() => onCheck()}>
        <View style={styles?.rowContainer}>
          <Text
            style={{
              ...styles.text,
              color: COLORS.lightGrey,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
          <View style={styles.timersStyles}>
            <Text
              style={{
                color: COLORS.lightGrey,
                textAlign: 'center',
                fontSize: FONT_SIZES?.text,
              }}>
              {isTaskAllDay
                ? 'All day'
                : hasNoEndTime
                ? `${startTime}`
                : `${startTime}-${endTime}`}
            </Text>
          </View>
          <View
            style={{
              ...styles.buttonContainer,
              borderColor: isChecked ? COLORS.validGreen : COLORS.lightGrey,
            }}>
            <IconButton
              icon="delete"
              iconColor={COLORS.lightGrey}
              size={ICON_SIZES?.buttonIcon}
              onPress={async () => await onTaskDelete(storageKey)}
            />
            <IconButton
              icon={isExpanded ? 'arrow-up-thick' : 'arrow-down-thick'}
              iconColor={COLORS.lightGrey}
              size={ICON_SIZES?.buttonIcon}
              onPress={() => setIsExpanded(!isExpanded)}
            />
            <IconButton
              icon={!isChecked ? 'check' : 'close'}
              iconColor={isChecked ? COLORS.validGreen : COLORS.lightGrey}
              size={ICON_SIZES?.buttonIcon}
              onPress={() => onCheck()}
            />
          </View>
        </View>
        {isExpanded ? (
          <View
            style={{
              ...styles?.descriptionContainer,
              borderTopColor: isChecked ? COLORS.validGreen : COLORS.lightGrey,
            }}>
            <Text
              style={{
                ...styles.text,
                color: COLORS.lightGrey,
              }}>
              {description}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: Platform?.isPad ? 16 : 8,
    borderRadius: 10,
    minHeight: Platform?.isPad ? 80 : 50,
    justifyContent: Platform?.isPad && 'center',
    width: '99%',
    paddingLeft: 2,
    paddingRight: 2,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: Platform?.isPad && 80,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100%',
  },
  descriptionContainer: {
    borderTopWidth: 1,
    paddingBottom: 12,
    paddingTop: 12,
  },
  text: {
    flex: 0.35,
    paddingLeft: 10,
    fontSize: FONT_SIZES?.text,
  },
  timersStyles: {
    flex: 0.4,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingLeft: '2.5%',
  },
  buttonContainer: {
    flex: 0.25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderLeftWidth: 1,
    paddingLeft: 2,
  },
});

export default TaskCard;
