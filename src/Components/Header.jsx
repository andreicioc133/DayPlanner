import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZES, ICON_SIZES} from '../utils/constants';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Modal, Portal} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useAppContext} from '../Store';

const Header = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(false);

  const {selectedDate, setSelectedDate} = useAppContext();
  useEffect(() => {
    console.log('date: ', date);
    console.log('selected date: ', selectedDate);
  }, [date]);
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
            iconColor={theme.colors.white}
            borderless={true}
            size={ICON_SIZES?.headerIcon}
            mode="outlined"
            containerColor={theme.colors.tertiaryColor}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{borderColor: theme.colors.secondaryColor}}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
        <View style={styles.textContainer}>
          <Button
            mode="contained"
            onPress={() => setOpenPicker(true)}
            style={styles.calendarButton}>
            {moment(date).format('L')}
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
    borderBottomColor: COLORS?.white,
    // height: ELEMENTS_DIMENSIONS.headerHeight,
    width: '100%',
  },
  text: {
    fontSize: FONT_SIZES.h2,
    color: COLORS.white,
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
    backgroundColor: COLORS.tertiaryColor,
  },
});

export default Header;