import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Header from '../../Components/Header';
import backgroundImage from '../../static/background.png';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';

const SupportScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles?.image}>
          <Header />

          <Text style={styles?.title}>Support</Text>
          <ScrollView style={{maxHeight: '65%'}}>
            <Text style={styles?.text}>
              If you encounter any issue please contact me at:
            </Text>
            <Text style={styles?.text}>andreicdev97@gmail.com</Text>
          </ScrollView>
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
  title: {
    fontSize: FONT_SIZES?.h1,
    color: COLORS?.lightGrey,
    textAlign: 'center',
    marginTop: 12,
  },
  text: {
    fontSize: FONT_SIZES?.text,
    color: COLORS?.lightGrey,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '3%',
  },
});

export default SupportScreen;
