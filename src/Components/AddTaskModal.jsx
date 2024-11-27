import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import {Button, Text, Modal, Portal, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {addMinutesToDate, createKeyFromDateObject} from '../utils/Helpers';
import {setObjectData} from '../utils/StorageFunctions';
import backgroundImage from '../static/background.png';
import {createTriggerNotification} from '../utils/Notifications';

const AddTaskModal = ({isTaskModalVisible, setIsTaskModalVisible}) => {
  const {height} = useWindowDimensions();

  //Time Picker states
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(moment(new Date()).add(1, 'minutes')),
  );
  const [taskDate, setTaskDate] = useState(new Date());

  //Open picker states
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [openTaskDatePicker, setOpenTaskDatePicker] = useState(false);

  //Text States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //Tabs states
  const [selectedTab, setSelectedTab] = useState(2);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  //task states
  const [isTaskAllDay, setIsTaskAllDay] = useState(true);
  const [noEndTime, setNoEndTime] = useState(false);

  const dateIn180Days = moment(new Date()).add(180, 'days');

  //validation states
  const [validationError, setValidationError] = useState(false);

  const periodButtonsData = [
    {
      id: 0,
      text: '5m',
      value: 5,
    },
    {
      id: 1,
      text: '10m',
      value: 10,
    },
    {
      id: 2,
      text: '15m',
      value: 15,
    },
    {
      id: 3,
      text: '30m',
      value: 30,
    },
    {
      id: 4,
      text: '1h',
      value: 60,
    },
    {
      id: 5,
      text: '1h30m',
      value: 90,
    },
  ];

  const tabButtons = [
    {
      id: 0,
      text: 'Interval',
    },
    {
      id: 1,
      text: 'Start&End Time',
    },
    {
      id: 2,
      text: 'All day',
    },
  ];

  const closeModal = () => {
    setSelectedPeriod(null);
    setValidationError(false);
    setSelectedTab(2);
    setTitle('');
    setDescription('');
    setStartTime(new Date());
    setEndTime(new Date(moment(new Date()).add(1, 'minutes')));
    setTaskDate(new Date());
    setIsTaskModalVisible(false);
    setIsTaskAllDay(true);
    setNoEndTime(false);
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

  const addNewTask = async () => {
    const key = createKeyFromDateObject(formatEndTimeWithDate(endTime));

    const taskData = {
      title: title,
      description: description,
      taskDate: taskDate,
      startTime: moment(formatStartTimeWithDate(startTime)).local(),
      endTime:
        isTaskAllDay === true || noEndTime === true
          ? moment(formatEndTimeWithDate(endTime)).endOf('day').local()
          : moment(formatEndTimeWithDate(endTime)).local(),
      key: key,
      isAllDay: isTaskAllDay,
      hasNoEndTime: noEndTime,
      isChecked: false,
    };

    if (title.length <= 0) {
      console.log('invalid');
      setValidationError(true);
      return;
    }
    if (startTime >= endTime) {
      Alert.alert(
        'The time at which the task ends cannot be earlier than the time at which it begins! ',
      );
      return;
    }

    setValidationError(false);

    setIsTaskModalVisible(false);

    await setObjectData(key, taskData);

    createTriggerNotification(
      formatStartTimeWithDate(startTime),
      isTaskAllDay,
      title,
    );

    closeModal();
  };

  const chooseTab = index => {
    setSelectedTab(index);
    index === 2 ? setIsTaskAllDay(true) : setIsTaskAllDay(false);
  };

  const choosePeriod = periodElement => {
    const date = new Date();
    setSelectedPeriod(periodElement?.id);

    setStartTime(formatStartTimeWithDate(new Date()));
    const endPeriod = addMinutesToDate(date, periodElement?.value);
    setEndTime(formatEndTimeWithDate(endPeriod));
  };

  const noEndTimeForTask = () => {
    setNoEndTime(!noEndTime);
    setEndTime(new Date(moment(formatEndTimeWithDate(endTime)).endOf('day')));
  };

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
              borderRadius: 20,
            }}>
            <ImageBackground
              source={backgroundImage}
              resizeMode="cover"
              style={styles?.image}
              imageStyle={{borderRadius: 20, width: '100%'}}>
              <View style={styles.innerImageContainer}>
                <Text style={{...styles.headerText, fontWeight: 'bold'}}>
                  Add task
                </Text>
                <TextInput
                  mode="flat"
                  label={<Text style={{color: COLORS.lightGrey}}>Title</Text>}
                  placeholder={
                    validationError === true && 'Please type a title!'
                  }
                  underlineColor={COLORS.lightGrey}
                  textColor={COLORS.lightGrey}
                  error={validationError}
                  value={title}
                  maxLength={20}
                  style={styles.textInput}
                  onChangeText={text => setTitle(text)}
                />

                <TextInput
                  mode="flat"
                  label={
                    <Text style={{color: COLORS.lightGrey}}>Description</Text>
                  }
                  underlineColor={COLORS.lightGrey}
                  textColor={COLORS.lightGrey}
                  value={description}
                  style={{...styles.textInput, marginTop: 8}}
                  onChangeText={text => setDescription(text)}
                />
                <Button
                  style={{
                    ...styles.periodButton,
                    width: Platform?.isPad ? '50%' : '60%',
                  }}
                  labelStyle={{
                    fontSize: FONT_SIZES?.text,
                    margin: Platform?.isPad ? 0 : 5,
                    paddingTop: Platform?.isPad ? 5 : 0,
                    paddingBottom: Platform?.isPad ? 5 : 0,
                  }}
                  mode="outlined"
                  textColor={COLORS?.lightGrey}
                  onPress={() => setOpenTaskDatePicker(true)}>
                  {moment(taskDate).format('YYYY-MM-DD')}
                </Button>
                <DatePicker
                  modal
                  mode="date"
                  open={openTaskDatePicker}
                  date={taskDate}
                  maximumDate={new Date(dateIn180Days)}
                  minimumDate={new Date()}
                  onConfirm={date => {
                    setOpenTaskDatePicker(false);
                    setTaskDate(date);
                  }}
                  onCancel={() => {
                    setOpenTaskDatePicker(false);
                  }}
                />
                {validationError ? (
                  <View>
                    <Text style={{color: 'red', fontSize: FONT_SIZES?.text}}>
                      *Please type a title!
                    </Text>
                  </View>
                ) : (
                  <>
                    <View>
                      <Text
                        style={{
                          color: COLORS?.lightGrey,
                          fontSize: FONT_SIZES?.text,
                        }}>
                        *Default interval is 1 minute!
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles?.tabButtonsContainer}>
                  {tabButtons.map(btn => (
                    <Button
                      key={btn?.id}
                      labelStyle={{
                        fontSize: FONT_SIZES?.text,
                        margin: Platform?.isPad ? 0 : 5,
                        paddingTop: Platform?.isPad ? 5 : 0,
                        paddingBottom: Platform?.isPad ? 5 : 0,
                      }}
                      style={{
                        ...styles.tabBtn,
                        backgroundColor:
                          selectedTab === btn?.id
                            ? COLORS.lightGreyRGBA
                            : 'transparent',
                        borderWidth: selectedTab === btn?.id ? 0 : 1,
                        borderColor:
                          selectedTab === btn?.id ? '0' : COLORS.lightGrey,
                      }}
                      mode="text"
                      textColor={
                        selectedTab === btn?.id
                          ? COLORS.primaryColor
                          : COLORS.lightGrey
                      }
                      onPress={() => chooseTab(btn?.id)}>
                      {btn?.text}
                    </Button>
                  ))}
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLORS.lightGrey,
                  }}></View>
                {selectedTab === 0 ? (
                  <>
                    <View
                      style={{
                        ...styles.periodButtonContainer,
                        height: height / 3,
                      }}>
                      {periodButtonsData.map(btn => (
                        <Button
                          key={btn?.id}
                          labelStyle={{
                            fontSize: FONT_SIZES?.text,
                            margin: Platform?.isPad ? 0 : 5,
                            paddingTop: Platform?.isPad ? 5 : 0,
                            paddingBottom: Platform?.isPad ? 5 : 0,
                          }}
                          style={{
                            ...styles.periodButton,
                            backgroundColor:
                              selectedPeriod === btn?.id
                                ? COLORS?.lightGreyRGBA
                                : 'transparent',
                            borderColor:
                              selectedPeriod === btn?.id
                                ? COLORS?.lightGreyRGBA
                                : COLORS.lightGrey,
                          }}
                          mode="outlined"
                          textColor={
                            selectedPeriod === btn?.id
                              ? COLORS?.primaryColor
                              : COLORS?.lightGrey
                          }
                          onPress={() => choosePeriod(btn)}>
                          {btn?.text}
                        </Button>
                      ))}
                    </View>
                  </>
                ) : selectedTab === 1 ? (
                  <>
                    <View
                      style={{...styles.allDayContainer, height: height / 3}}>
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
                      <Text
                        style={{
                          ...styles.headerText,
                          paddingTop: 0,
                          paddingBottom: '5%',
                        }}>
                        Choose Start & End Time
                      </Text>
                      <Button
                        style={{
                          ...styles.noEndTimeButton,
                          alignSelf: 'center',
                          backgroundColor:
                            noEndTime === true
                              ? COLORS.lightGrey
                              : 'transparent',
                        }}
                        mode="outlined"
                        textColor={COLORS.lightGrey}
                        onPress={() => noEndTimeForTask()}>
                        <Text
                          style={{
                            fontSize: FONT_SIZES?.text,
                            color:
                              noEndTime === true
                                ? COLORS.primaryColor
                                : COLORS.lightGrey,
                          }}>
                          No end time{' '}
                        </Text>
                      </Button>
                      <View style={styles.buttonContainer}>
                        <View style={styles.startEndTimesContainer}>
                          <Text style={styles.text}>Start Time:</Text>
                          <Button
                            style={styles.timeButton}
                            mode="outlined"
                            labelStyle={{
                              fontSize: FONT_SIZES?.text,
                              margin: Platform?.isPad ? 0 : 5,
                              paddingTop: Platform?.isPad ? 5 : 0,
                              paddingBottom: Platform?.isPad ? 5 : 0,
                            }}
                            textColor={COLORS.lightGrey}
                            onPress={() => setOpenStartTimePicker(true)}>
                            {moment(startTime).format('LT').toString()}
                          </Button>
                        </View>
                        {noEndTime ? (
                          <>
                            <View
                              style={{
                                height: '30%',
                              }}>
                              <Text
                                style={{
                                  fontSize: FONT_SIZES?.text,
                                  color: COLORS?.lightGrey,
                                }}>
                                You cannot set the end time!
                              </Text>
                            </View>
                          </>
                        ) : (
                          <View style={styles.startEndTimesContainer}>
                            <Text style={styles.text}>End Time:</Text>
                            <Button
                              style={styles.timeButton}
                              labelStyle={{
                                fontSize: FONT_SIZES?.text,
                                margin: Platform?.isPad ? 0 : 5,
                                paddingTop: Platform?.isPad ? 5 : 0,
                                paddingBottom: Platform?.isPad ? 5 : 0,
                              }}
                              mode="outlined"
                              textColor={COLORS.lightGrey}
                              onPress={() => setOpenEndTimePicker(true)}>
                              {moment(endTime).format('LT').toString()}
                            </Button>
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{...styles.allDayContainer, height: height / 3}}>
                      <Text style={{...styles.text, fontSize: FONT_SIZES.h3}}>
                        Your task will not have a time frame to be completed.
                      </Text>
                    </View>
                  </>
                )}

                <View style={styles.confirmButtonsContainer}>
                  <Button
                    style={{
                      ...styles.button,
                      marginRight: 6,
                      borderWidth: 1,
                      borderColor: COLORS.lightGrey,
                    }}
                    mode="outlined"
                    textColor={COLORS.lightGrey}
                    labelStyle={{
                      fontSize: FONT_SIZES?.text,
                      margin: Platform?.isPad ? 0 : 5,
                      paddingTop: Platform?.isPad ? 5 : 0,
                      paddingBottom: Platform?.isPad ? 5 : 0,
                    }}
                    onPress={() => closeModal()}>
                    Cancel
                  </Button>
                  <Button
                    style={{
                      ...styles.button,
                      backgroundColor: COLORS.lightGreyRGBA,
                      borderWidth: 0,
                    }}
                    labelStyle={{
                      fontSize: FONT_SIZES?.text,
                      margin: Platform?.isPad ? 0 : 5,
                      paddingTop: Platform?.isPad ? 5 : 0,
                      paddingBottom: Platform?.isPad ? 5 : 0,
                    }}
                    mode="outlined"
                    textColor={COLORS.primaryColor}
                    onPress={() => addNewTask()}>
                    Add
                  </Button>
                </View>
              </View>
            </ImageBackground>
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
    width: '100%',
  },
  image: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  innerImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 6,
    paddingRight: 6,
  },
  headerText: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.lightGrey,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  noEndTimeButton: {
    borderColor: COLORS.lightGrey,
    height: Platform?.isPad ? 50 : 40,
    justifyContent: Platform?.isPad ? 'center' : 'center',
    borderRadius: 50,
    marginBottom: Platform?.isPad ? 16 : 0,
  },
  allDayContainer: {
    display: 'flex',
    paddingTop: '5%',
  },
  text: {
    fontSize: FONT_SIZES?.text,
    color: COLORS.lightGrey,
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
    backgroundColor: 'transparent',
    color: COLORS.lightGrey,
    fontSize: FONT_SIZES?.text,
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
    paddingTop: 12,
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
    borderRadius: 50,
    borderBottomWidth: 1,
    width: Platform?.isPad ? '30%' : 'auto',
    height: Platform?.isPad ? 50 : 40,
    justifyContent: Platform?.isPad ? 'center' : 'center',
    borderRadius: 50,
    marginTop: Platform?.isPad ? 16 : 6,
    marginBottom: Platform?.isPad ? 16 : 6,
  },
  timeButton: {
    height: Platform?.isPad ? 50 : 40,
    justifyContent: Platform?.isPad ? 'center' : 'center',
    borderRadius: 50,
    marginTop: Platform?.isPad ? 16 : 12,
    marginBottom: Platform?.isPad ? 16 : 12,
    flex: 0.5,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  periodButton: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.lightGrey,
    width: '40%',
    height: Platform?.isPad ? 50 : 40,
    justifyContent: Platform?.isPad ? 'center' : 'center',
    borderRadius: 50,
    marginTop: Platform?.isPad ? 16 : 8,
    marginBottom: Platform?.isPad ? 16 : 8,
  },
  confirmButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  button: {
    width: '30%',
    height: Platform?.isPad ? 50 : 40,
    justifyContent: Platform?.isPad ? 'center' : 'center',
    borderRadius: 50,
    marginTop: Platform?.isPad ? 16 : 8,
    marginBottom: Platform?.isPad ? 16 : 8,
  },
});

export default AddTaskModal;
