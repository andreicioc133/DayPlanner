/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import type {PropsWithChildren} from 'react';
import Store from './src/Store';
import MainTheme from './src/MainTheme';
import DrawerNavigation from './src/Components/DrawerNavigation';
import MainStack from './src/Components/MainStack';
import {PaperProvider} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  return (
    <>
      <PaperProvider>
        <Store>
          <MainTheme>
            <MainStack />
          </MainTheme>
        </Store>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
