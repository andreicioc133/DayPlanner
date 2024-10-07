import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZES, ICON_SIZES} from '../utils/constants';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Modal, Portal, TextInput} from 'react-native-paper';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {
  addMinutesToDate,
  formatToLocalTime,
  createKeyFromDateObject,
} from '../utils/Helpers';
import {setObjectData} from '../utils/StorageFunctions';

const AddTaskModal = ({isTaskModalVisible, setIsTaskModalVisible}) => {
  //Time Picker states
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [taskDate, setTaskDate] = useState(new Date());

  //Open picker states
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [openTaskDatePicker, setOpenTaskDatePicker] = useState(false);

  //Text States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //Tabs states
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  //task states
  const [task, setTask] = useState({});

  const periodButtonsData = [
    {
      id: 0,
      text: '15m',
      value: 15,
    },
    {
      id: 1,
      text: '30m',
      value: 30,
    },
    {
      id: 2,
      text: '1h',
      value: 60,
    },
    {
      id: 3,
      text: '1h30m',
      value: 90,
    },
    {
      id: 4,
      text: '2h',
      value: 120,
    },
    {
      id: 5,
      text: '3h',
      value: 180,
    },
  ];

  const tabButtons = [
    {
      id: 0,
      text: 'Period',
    },
    {
      id: 1,
      text: 'Start&End Time',
    },
  ];

  const closeModal = () => {
    setSelectedPeriod(null);
    setSelectedTab(0);
    setTitle('');
    setDescription('');
    setStartTime(new Date());
    setEndTime(new Date());
    setIsTaskModalVisible(false);
  };

  const formatStartTimeWithDate = startTimeDate => {
    const formattedTaskDate = moment(taskDate).format('YYYY-MM-DD');
    const formattedStartTime = moment(startTimeDate).format('HH:mm');
    const finalDate = moment(formattedTaskDate + ' ' + formattedStartTime);

    return new Date(finalDate.format('YYYY-MM-DD HH:mm'));
  };

  const formatEndTimeWithDate = endTimeDate => {
    const formattedTaskDate = moment(taskDate).format('YYYY-MM-DD');
    const formattedEndTime = moment(endTimeDate).format('HH:mm');
    const finalDate = moment(formattedTaskDate + ' ' + formattedEndTime);

    return new Date(finalDate.format('YYYY-MM-DD HH:mm'));
  };

  const addNewTask = () => {
    const taskData = {
      title: title,
      description: description,
      taskDate: taskDate,
      startTime: formatStartTimeWithDate(startTime),
      endTime: formatEndTimeWithDate(endTime),
    };

    setTask(taskData);
    setIsTaskModalVisible(false);

    const key = createKeyFromDateObject(startTime);

    setObjectData(key, taskData);

    console.log('task: ', task);
    console.log('task data: ', taskData);
  };

  const chooseTab = index => {
    setSelectedTab(index);
  };

  const choosePeriod = periodElement => {
    const date = new Date();
    setSelectedPeriod(periodElement?.id);
    setStartTime(new Date());
    const endPeriod = addMinutesToDate(date, periodElement?.value);
    setEndTime(endPeriod);
    // console.log('period index: ', periodElement?.id);
  };

  useEffect(() => {
    console.log(
      '------------------------------------------------------------------------',
    );
    console.log('title: ', title);
    console.log('desc: ', description);
    console.log('taskDate: ', taskDate);
    console.log('startTime: ', startTime);
    console.log('endTime : ', endTime);
    console.log('endTime hr: ', formatToLocalTime(endTime));
  }, [startTime, endTime, taskDate]);
  return (
    <>
      <View style={styles?.container}>
        <Portal>
          <Modal
            visible={isTaskModalVisible}
            onDismiss={() => setIsTaskModalVisible(false)}
            contentContainerStyle={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              paddingLeft: 6,
              paddingRight: 6,
              minHeight: '70%',
            }}>
            <Text style={styles.headerText}>Add task</Text>
            <TextInput
              mode="outlined"
              label="Title"
              value={title}
              style={styles.textInput}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              mode="outlined"
              label="Description"
              value={description}
              style={{...styles.textInput, marginTop: 8}}
              onChangeText={text => setDescription(text)}
            />
            <Button
              style={{...styles.periodButton, width: '60%'}}
              mode="outlined"
              textColor={COLORS?.primaryColor}
              onPress={() => setOpenTaskDatePicker(true)}>
              {moment(taskDate).format('YYYY-MM-DD')}
            </Button>
            <DatePicker
              modal
              mode="date"
              open={openTaskDatePicker}
              date={taskDate}
              onConfirm={date => {
                setOpenTaskDatePicker(false);
                setTaskDate(date);
              }}
              onCancel={() => {
                setOpenTaskDatePicker(false);
              }}
            />
            <View style={styles?.tabButtonsContainer}>
              {tabButtons.map(btn => (
                <Button
                  key={btn?.id}
                  style={{
                    ...styles.tabBtn,
                    borderBottomColor: COLORS?.primaryColor,
                    backgroundColor:
                      selectedTab === btn?.id
                        ? COLORS?.lightGrey
                        : COLORS?.white,
                  }}
                  mode="text"
                  textColor={COLORS.primaryColor}
                  onPress={() => chooseTab(btn?.id)}>
                  {btn?.text}
                </Button>
              ))}
            </View>
            {selectedTab === 0 ? (
              <>
                <View style={styles.periodButtonContainer}>
                  {periodButtonsData.map(btn => (
                    <Button
                      key={btn?.id}
                      style={{
                        ...styles.periodButton,
                        backgroundColor:
                          selectedPeriod === btn?.id
                            ? COLORS?.primaryColor
                            : COLORS?.white,
                      }}
                      mode="outlined"
                      textColor={
                        selectedPeriod === btn?.id
                          ? COLORS?.white
                          : COLORS?.primaryColor
                      }
                      onPress={() => choosePeriod(btn)}>
                      {btn?.text}
                    </Button>
                  ))}
                </View>
              </>
            ) : (
              <>
                <DatePicker
                  modal
                  mode="time"
                  open={openStartTimePicker}
                  date={startTime}
                  onConfirm={time => {
                    setOpenStartTimePicker(false);
                    setStartTime(time);
                    setSelectedPeriod(null);
                  }}
                  onCancel={() => {
                    setOpenStartTimePicker(false);
                  }}
                />
                <DatePicker
                  modal
                  mode="time"
                  open={openEndTimePicker}
                  date={endTime}
                  onConfirm={time => {
                    setOpenEndTimePicker(false);
                    setEndTime(time);
                    setSelectedPeriod(null);
                  }}
                  onCancel={() => {
                    setOpenEndTimePicker(false);
                  }}
                />
                <Text style={styles.headerText}>Choose Start & End Time</Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.startEndTimesContainer}>
                    <Text style={styles.text}>Start Time:</Text>
                    <Button
                      style={styles.timeButton}
                      mode="outlined"
                      textColor={COLORS.primaryColor}
                      onPress={() => setOpenStartTimePicker(true)}>
                      {moment(startTime).format('LT').toString()}
                    </Button>
                  </View>
                  <View style={styles.startEndTimesContainer}>
                    <Text style={styles.text}>End Time:</Text>
                    <Button
                      style={styles.timeButton}
                      mode="outlined"
                      textColor={COLORS.primaryColor}
                      onPress={() => setOpenEndTimePicker(true)}>
                      {moment(endTime).format('LT').toString()}
                    </Button>
                  </View>
                </View>
              </>
            )}

            <View style={styles.confirmButtonsContainer}>
              <Button
                style={{...styles.button, marginRight: 6}}
                mode="outlined"
                textColor={COLORS.primaryColor}
                onPress={() => closeModal()}>
                Cancel
              </Button>
              <Button
                style={{...styles.button, backgroundColor: COLORS.primaryColor}}
                mode="outlined"
                textColor={COLORS.white}
                onPress={() => addNewTask()}>
                Add
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // height: ELEMENTS_DIMENSIONS.headerHeight,
    width: '100%',
  },
  headerText: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.primaryColor,
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: FONT_SIZES?.text,
    color: COLORS.primaryColor,
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  startEndTimesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  periodButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  tabButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 4,
  },
  tabBtn: {
    marginTop: 6,
    marginBottom: 6,
    width: '50%',
    borderRadius: 0,
    borderBottomWidth: 1,
  },
  timeButton: {
    marginTop: 12,
    marginBottom: 12,
    flex: 0.5,
  },
  periodButton: {
    marginTop: 12,
    marginBottom: 12,
    width: '40%',
  },
  confirmButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    // backgroundColor: 'red',
    // height: '12%',
  },
  button: {
    width: '30%',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default AddTaskModal;
