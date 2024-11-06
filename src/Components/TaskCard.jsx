import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS, ICON_SIZES} from '../utils/constants';
import {TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';

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
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        onPress={() => setIsChecked(!isChecked)}>
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
            <Text style={{color: COLORS.lightGrey, textAlign: 'center'}}>
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
              onPress={() => setIsChecked(!isChecked)}
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
    marginTop: 8,
    borderRadius: 10,
    minHeight: 50,
    width: '99%',
    paddingLeft: 2,
    paddingRight: 2,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
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
