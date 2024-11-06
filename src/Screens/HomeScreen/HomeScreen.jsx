import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import Header from '../../Components/Header';
import FloatingButton from '../../Components/FloatingButton';
import HomeScreenPlansContainer from '../../Components/HomeScreenPlansContainer';
import backgroundImage from '../../static/background.png';
import {
  getAllKeys,
  removeValue,
  getObjectData,
  setObjectData,
} from '../../utils/StorageFunctions';
import moment from 'moment';

const HomeScreen = () => {
  const onChangeDeletionAlertKey = async () => {
    const isKey = await getObjectData('prevention-key');

    if (isKey === true) {
      return true;
    } else {
      await setObjectData('prevention-key', true);
      return false;
    }
  };

  const alertTaskDeletionPrevention = async () => {
    const isKeySetForPrevention = await onChangeDeletionAlertKey();

    if (isKeySetForPrevention) {
      return;
    }

    Alert.alert(
      'Automatic task deletion system',
      'Tasks older than 3 months will be automatically deleted to keep the application optimized and lightweight!Thank you for your understanding!',
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('Pressed OK!');
          },
        },
      ],
    );
  };

  const deleteTasksOlderThan3Months = async () => {
    const keys = await getAllKeys();

    keys?.map(key => {
      const dateFromKey = moment(new Date(key.substring(0, 33))).format('L');
      const date3MonthsEarlier = moment(new Date())
        .subtract(90, 'days')
        .format('L');
      if (dateFromKey < date3MonthsEarlier) {
        removeValue(key);
        Alert.alert(
          'Tasks older than 3 months were automatically deleted to keep the application optimized!Thank you for your understanding!',
        );
      }
    });
  };

  useEffect(() => {
    deleteTasksOlderThan3Months();
    alertTaskDeletionPrevention();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles?.image}>
          <Header />
          <HomeScreenPlansContainer />
          <FloatingButton />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  image: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 0,
    height: '100%',
  },
});

export default HomeScreen;
