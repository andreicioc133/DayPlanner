import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {COLORS, ICON_SIZES} from '../utils/constants';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Portal} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useAppContext} from '../Store';
import DeviceInfo from 'react-native-device-info';

const isNotch = DeviceInfo.hasNotch();

const Header = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(false);

  const {setSelectedDate} = useAppContext();

  return (
    <>
      <View style={styles?.container}>
        <Portal>
          <DatePicker
            modal
            mode="date"
            open={openPicker}
            date={date}
            onConfirm={date => {
              setOpenPicker(false);
              setDate(date);
              setSelectedDate(date);
            }}
            onCancel={() => {
              setOpenPicker(false);
            }}
          />
        </Portal>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="format-align-justify"
            iconColor={COLORS.lightGrey}
            borderless={true}
            size={ICON_SIZES?.headerIcon}
            mode="outlined"
            rippleColor="rgba(0, 0, 0, .32)"
            style={{
              borderWidth: 0,
            }}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
        <View style={styles.textContainer}>
          <Button
            mode="contained"
            onPress={() => setOpenPicker(true)}
            style={styles.calendarButton}>
            <Text style={styles.text}>{moment(date).format('L')}</Text>
          </Button>
        </View>
        <View style={styles.textContainer}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS?.lightGrey,
    paddingBottom: 4,
    paddingTop: isNotch === true ? '10%' : '5%',
    width: '100%',
  },
  text: {
    color: COLORS.primaryColor,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  calendarButton: {
    width: 200,
    borderWidth: 1,
    backgroundColor: COLORS.lightGrey,
  },
});

export default Header;
