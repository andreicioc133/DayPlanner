import React, {useState, version} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import TutorialScreen from '../Screens/HomeScreen/TutorialScreen';
import SupportScreen from '../Screens/HomeScreen/SupportScreen';
import {COLORS, FONT_SIZES} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {version as app_version} from './../../package.json';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();

  const buttonsData = [
    {id: 0, title: 'Home', route: 'Home'},
    {id: 1, title: 'How to', route: 'How to'},
    {id: 2, title: 'Support', route: 'Support'},
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
            alignSelf: 'flex-end',
          }}>
          <Text
            style={{
              color: COLORS?.lightGrey,
              fontSize: FONT_SIZES?.text,
              textAlign: 'left',
              paddingLeft: '3%',
              paddingRight: '3%',
            }}>
            Tasks older than 3 months will be automatically deleted to keep the
            application optimized and lightweight.
          </Text>

          <Text
            style={{
              color: COLORS?.lightGrey,
              fontSize: FONT_SIZES?.text,
              textAlign: 'left',
              paddingLeft: '3%',
              paddingRight: '3%',
              marginBottom: '10%',
            }}>
            Thank you for your understanding!
          </Text>
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
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    height: 48,
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
  },
});
