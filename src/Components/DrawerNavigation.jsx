import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import TutorialScreen from '../Screens/HomeScreen/TutorialScreen';
import {useTheme} from 'react-native-paper';
import {COLORS} from '../utils/constants';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const theme = useTheme();
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
        headerStyle: {
          backgroundColor: 'red',
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
      <Drawer.Screen name="How to" component={TutorialScreen} options={{}} />
    </Drawer.Navigator>
  );
}
