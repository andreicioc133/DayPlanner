import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollViewComponent,
  TouchableOpacity,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS, FONT_SIZES} from '../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';
import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';
import {clearAllStorage, getAllKeys} from '../utils/StorageFunctions';
import moment from 'moment';
import {useAppContext} from '../Store';

const HomeScreenPlansContainer = () => {
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

  const [plans, setPlans] = useState({});
  const [allKeys, setAllKeys] = useState([]);
  const [todayKeys, setTodayKeys] = useState([]);

  const {selectedDate} = useAppContext();

  const getKeys = async () => {
    const keys = await getAllKeys();
    const today = moment(new Date()).format('L');
    const yesterday = moment(new Date()).subtract(1, 'days').format('L');
    const tommorow = moment(new Date()).add(1, 'days').format('L');
    const filteredKeys = [];
    console.log('yesterdaY: ', yesterday, 'tommorow: ', tommorow);

    keys.map(element => {
      const date = moment(new Date(element)).format('L');

      if (date === moment(selectedDate).format('L')) {
        filteredKeys.push(element);
        console.log('date: ', date);
      }
    });
    setTodayKeys(filteredKeys);
  };

  const getPlans = () => {};

  useEffect(() => {
    getKeys();
    console.log('plans: ', plans);
    console.log('todayKeys: ', todayKeys);
  }, [plans, isTaskModalVisible]);

  return (
    <>
      <View style={styles?.container}>
        <View style={styles?.header}>
          <Text style={styles?.headerText}>DATE</Text>
          <IconButton
            style={styles.addTaskButton}
            iconColor={COLORS.white}
            icon="plus"
            onPress={() => setIsTaskModalVisible(true)}
          />
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles?.ScrollViewContentContainer}>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <AddTaskButton onPress={() => setIsTaskModalVisible(true)} />
          <TouchableOpacity
            onPress={() => clearAllStorage()}
            style={{
              marginTop: '10%',
              width: '80%',
              height: '20%',
              backgroundColor: 'white',
            }}>
            <Text>clear storage</Text>
          </TouchableOpacity>
          <AddTaskModal
            isTaskModalVisible={isTaskModalVisible}
            setIsTaskModalVisible={setIsTaskModalVisible}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.tertiaryColor,
    marginTop: 28,
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: COLORS?.white,
    shadowColor: COLORS.white,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: '70%',
    width: '85%',
  },
  scrollView: {width: '100%'},
  ScrollViewContentContainer: {display: 'flex', alignItems: 'center'},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.white,
    height: 50,
  },
  headerText: {
    color: COLORS.white,
    fontSize: FONT_SIZES?.h3,
    paddingLeft: 16,
  },
  addTaskButton: {
    color: COLORS?.white,
  },
});

export default HomeScreenPlansContainer;
