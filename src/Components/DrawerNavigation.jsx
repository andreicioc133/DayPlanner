import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import {useTheme} from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.primaryColor,
        },
        headerStyle: {
          backgroundColor: 'red',
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
    </Drawer.Navigator>
  );
}