import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../utils/constants';
import Header from '../../Components/Header';
import FloatingButton from '../../Components/FloatingButton';
import HomeScreenPlansContainer from '../../Components/HomeScreenPlansContainer';

const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <HomeScreenPlansContainer />
        <FloatingButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryColor,
    paddingTop: 20,
    height: '100%',
  },
});

export default HomeScreen;
