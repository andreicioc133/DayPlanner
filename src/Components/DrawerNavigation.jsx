import React, {useState, version} from 'react';
import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import TutorialScreen from '../Screens/HomeScreen/TutorialScreen';
import SupportScreen from '../Screens/HomeScreen/SupportScreen';
import DraftPlansScreen from '../Screens/HomeScreen/DraftPlansScreen';
import {COLORS, FONT_SIZES} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {version as app_version} from './../../package.json';
import {deletePreviousTasks} from '../utils/Helpers';
import moment from 'moment';
import {useAppContext} from '../Store';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();

  const {setSelectedDate} = useAppContext();

  const buttonsData = [
    {id: 0, title: 'Home', route: 'Home'},
    {id: 1, title: 'How to', route: 'How to'},
    {id: 2, title: 'Support', route: 'Support'},
    // {id: 3, title: 'Draft Plans', route: 'Draft Plans'},
  ];

  const navigateToScreen = el => {
    navigation.navigate(el?.route);
    setSelectedIndex(el?.id);
  };

  function CustomDrawerContent(props) {
    return (
      <>
        <View
          style={{
            display: 'flex',
            flex: 0.6,
            alignItems: 'center',
            paddingTop: '15%',
            width: '100%',
          }}>
          {buttonsData?.map(btnEl => (
            <TouchableOpacity
              key={btnEl?.id}
              style={{
                ...styles?.button,
                backgroundColor:
                  selectedIndex === btnEl?.id
                    ? COLORS?.tertiaryColor
                    : 'transparent',
              }}
              onPress={() => navigateToScreen(btnEl)}>
              <Text style={styles?.buttonText}>{btnEl?.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'flex-end',
            paddingLeft: '3%',
            paddingRight: '3%',
            paddingBottom: '10%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              ...styles?.button,
              backgroundColor: 'transparent',
              marginBottom: 10,
            }}
            onPress={() =>
              Alert.alert(
                'Delete all past plans',
                `are you sure you want to delete all the plans created up to the date of ${moment(
                  new Date(),
                )
                  .subtract(1, 'days')
                  .format('L')} ?`,
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      deletePreviousTasks();
                      setSelectedDate(new Date());
                      props.navigation.closeDrawer();
                    },
                  },
                ],
              )
            }>
            <Text style={styles?.buttonText}>Delete all past plans</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS?.lightGrey,
              fontSize: FONT_SIZES?.text,
              textAlign: 'left',
              paddingLeft: '3%',
              paddingRight: '3%',
            }}>
            Version {app_version}
          </Text>
        </View>
      </>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.primaryColor,
        },
        drawerLabelStyle: {
          color: COLORS?.lightGrey,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
      <Drawer.Screen name="How to" component={TutorialScreen} options={{}} />
      <Drawer.Screen name="Support" component={SupportScreen} options={{}} />
      {/* <Drawer.Screen
        name="Draft Plans"
        component={DraftPlansScreen}
        options={{}}
      /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    height: Platform?.isPad ? 50 : 48,
    minWidth: '90%',
    paddingLeft: '5%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: '5%',
    borderColor: COLORS.tertiaryColor,
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS?.lightGrey,
    fontSize: FONT_SIZES?.text,
  },
});
