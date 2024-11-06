import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import Header from '../../Components/Header';
import backgroundImage from '../../static/background.png';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';

const TutorialScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles?.image}>
          <Header />

          <Text style={styles?.title}>How to use the app</Text>
          <ScrollView style={{maxHeight: '65%'}}>
            <Text style={styles?.text}>
              {' '}
              1. To navigate between dates you have to click on the button that
              is displaying a date, located in the header of the app!
            </Text>
            <Text style={styles?.text}>
              {' '}
              2. To create a new task press on 'Add task button' in the
              Homescreen.
            </Text>
            <Text style={styles?.text}>
              {' '}
              3. Input a title for your task! This field is mandatory.*
            </Text>
            <Text style={styles?.text}>
              {' '}
              4. Optionally you can input a description.
            </Text>
            <Text style={styles?.text}>
              {' '}
              5. Select a date for the task from the button on the center that
              is displaying a date.
            </Text>
            <Text style={styles?.text}>
              {' '}
              6. You have multiple options to select an interval for the task:
            </Text>
            <Text style={styles?.text}>
              {' '}
              - Interval: Sets the starting time as the current time and the
              ending time depending on your choice (e. g. Choosing 5m will set
              the end time to 5 minutes into the future)!
            </Text>
            <Text style={styles?.text}>
              {' '}
              - Start&End Time: Tap on the buttons to choose a Starting time and
              an Ending time for your task!
            </Text>
            <Text style={styles?.text}>
              {' '}
              - All day: Choosing 'All day' option will not set an interval for
              your task! Just the date!
            </Text>
            <Text style={styles?.text}>
              {' '}
              7. To delete a task, click on the trash icon associated with the
              task.
            </Text>
            <Text style={styles?.text}>
              {' '}
              8. To delete all tasks for a current date, click on the trash icon
              which is above the tasks.
            </Text>
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

export default TutorialScreen;
