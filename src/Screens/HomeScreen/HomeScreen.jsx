import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Linking,
  Platform,
} from 'react-native';
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
import VersionCheck from 'react-native-version-check';

const HomeScreen = () => {
  const checkIfUpdateNeeded = async () => {
    try {
      const latestVersion =
        Platform.OS === 'ios'
          ? await VersionCheck.getLatestVersion({
              provider: 'appStore', // for iOS
            })
          : await VersionCheck.getLatestVersion({
              provider: 'playstore', // for android
            });

      const currentVersion = VersionCheck.getCurrentVersion();

      if (latestVersion > currentVersion) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? VersionCheck.getAppStoreUrl({
                        appID: 'org.reactjs.native.example.DayPlanner',
                      })
                    : VersionCheck.getPlayStoreUrl({
                        packageName: 'org.reactjs.native.example.DayPlanner',
                      }),
                );
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    checkIfUpdateNeeded();
  }, []);

  // const onChangeDeletionAlertKey = async () => {
  //   const isKey = await getObjectData('prevention-key');

  //   if (isKey === true) {
  //     return true;
  //   } else {
  //     await setObjectData('prevention-key', true);
  //     return false;
  //   }
  // };

  // const alertTaskDeletionPrevention = async () => {
  //   const isKeySetForPrevention = await onChangeDeletionAlertKey();

  //   if (isKeySetForPrevention) {
  //     return;
  //   }

  //   Alert.alert(
  //     'Automatic task deletion system',
  //     'Tasks older than 3 months will be automatically deleted to keep the application optimized and lightweight!Thank you for your understanding!',
  //     [
  //       {
  //         text: 'Ok',
  //         onPress: () => {
  //           console.log('Pressed OK!');
  //         },
  //       },
  //     ],
  //   );
  // };

  // useEffect(() => {
  //   alertTaskDeletionPrevention();
  // }, []);

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
