import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Header from '../../Components/Header';
import FloatingButton from '../../Components/FloatingButton';
import HomeScreenPlansContainer from '../../Components/HomeScreenPlansContainer';
import backgroundImage from '../../static/background.png';

const TutorialScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles?.image}>
          <Header />
          <View>
            <Text>asd</Text>
          </View>
          <FloatingButton />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // backgroundColor: '#F5F5F5',
    // paddingTop: 20,
    height: '100%',
    flex: 1,
  },
  image: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // paddingTop: 20,
    paddingBottom: 0,
    height: '100%',
  },
});

export default TutorialScreen;
