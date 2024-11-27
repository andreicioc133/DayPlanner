import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS, FONT_SIZES} from '../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';
import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';
import {
  clearAllStorage,
  getAllKeys,
  getObjectData,
  removeValue,
  removeMultipleValues,
} from '../utils/StorageFunctions';
import moment from 'moment';
import {useAppContext} from '../Store';
import {formatToLocalTime} from '../utils/Helpers';
import uuid from 'react-native-uuid';

const HomeScreenPlansContainer = () => {
  const [plans, setPlans] = useState([]);
  const [isDeleted, setIsDeleted] = useState(true);

  const {selectedDate, isTaskModalVisible, setIsTaskModalVisible} =
    useAppContext();

  const dayName = moment(selectedDate, 'YYYY-MM-DD HH:mm:ss')
    .format('dddd')
    .substring(0, 3);

  const fetchData = async () => {
    const keys = await getAllKeys();
    const filteredKeys = [];
    const filteredPlans = [];
    const formattedSelectedDate = moment(new Date(selectedDate)).format(
      'YYYY-MM-DD',
    );
    if (keys.length > 0) {
      keys.map(element => {
        const date = moment(new Date(element.substring(0, 33))).format('L');

        if (date === moment(selectedDate).format('L')) {
          filteredKeys.push(element);
        }
      });
    }

    if (keys.length > 0) {
      await Promise.all(
        filteredKeys.map(async element => {
          const formattedDate = moment(
            new Date(element.substring(0, 33)),
          ).format('YYYY-MM-DD');

          if (formattedDate === formattedSelectedDate) {
            const res = await getObjectData(element);
            filteredPlans.push(res);
          }
        }),
      );
    }

    filteredPlans.sort((a, b) =>
      a.endTime
        .split('/')
        .reverse()
        .join()
        .localeCompare(b.endTime.split('/').reverse().join()),
    );

    setPlans(filteredPlans);
  };

  const onTaskDelete = async key => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          removeValue(key);
          setIsDeleted(key);
        },
      },
    ]);
  };

  const deleteAllSelectedDateTasks = async () => {
    const keys = await getAllKeys();
    const formattedSelectedDate = moment(new Date(selectedDate)).format('L');

    const keysToDelete = keys.filter(key => {
      if (
        moment(new Date(key.substring(0, 33))).format('L') ===
        formattedSelectedDate
      ) {
        return key;
      }
    });

    Alert.alert(
      'Delete all tasks',
      `Are you sure you want to delete all tasks for: ${
        dayName + ' ' + moment(selectedDate).format('L')
      } ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await removeMultipleValues(keysToDelete);
            setIsDeleted(!isDeleted);
          },
        },
      ],
    );
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, isTaskModalVisible, isDeleted]);

  return (
    <>
      <View style={styles?.container}>
        <View style={styles?.header}>
          <Text style={styles?.headerText}>
            {dayName + ' ' + moment(selectedDate).format('L')}
          </Text>
          <IconButton
            style={styles.deleteAllTasksButton}
            iconColor={COLORS.lightGrey}
            size={Platform.isPad ? 40 : 26}
            icon="delete"
            onPress={() => deleteAllSelectedDateTasks()}
          />
        </View>
        {plans?.length > 0 ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles?.ScrollViewContentContainer}>
            {plans.map(plan => {
              return (
                <TaskCard
                  key={uuid.v4()}
                  title={plan?.title}
                  description={plan?.description}
                  startTime={formatToLocalTime(plan?.startTime)}
                  endTime={formatToLocalTime(plan?.endTime)}
                  taskDate={plan?.taskDate}
                  storageKey={plan?.key}
                  onTaskDelete={onTaskDelete}
                  isTaskAllDay={plan?.isAllDay}
                  hasNoEndTime={plan?.hasNoEndTime}
                  plan={plan}
                />
              );
            })}
          </ScrollView>
        ) : (
          <>
            <View style={styles?.textView}>
              <Text style={{...styles?.headerText, textAlign: 'center'}}>
                Press 'Add new task' button to add a new plan!
              </Text>
            </View>
          </>
        )}

        <AddTaskButton onPress={() => setIsTaskModalVisible(true)} />

        {/* <TouchableOpacity
          onPress={() => clearAllStorage()}
          style={{
            marginTop: 4,
            width: '80%',
            height: '5%',
            backgroundColor: 'white',
          }}>
          <Text>clear storage</Text>
        </TouchableOpacity> */}

        <AddTaskModal
          isTaskModalVisible={isTaskModalVisible}
          setIsTaskModalVisible={setIsTaskModalVisible}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 18,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 20,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS?.lightGrey,
    shadowColor: COLORS.lightGrey,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.35,
    shadowRadius: 3,
    height: Platform?.isPad ? '75%' : '70%',
    width: Platform?.isPad ? '85%' : '95%',
    zIndex: 1,
  },
  scrollView: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  ScrollViewContentContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80%',
    paddingBottom: 16,
  },
  textView: {flex: 1, justifyContent: 'center'},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.lightGrey,
    height: 50,
    marginTop: Platform.isPad && 12,
    marginBottom: Platform.isPad && 12,
    paddingBottom: Platform.isPad && 12,
  },
  headerText: {
    color: COLORS.lightGrey,
    fontSize: FONT_SIZES?.h3,
    paddingLeft: 16,
    fontWeight: 'bold',
  },
  deleteAllTasksButton: {
    color: COLORS?.lightGrey,
  },
});

export default HomeScreenPlansContainer;
