import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {useAppContext} from './Store';

const mainLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryColor: '#17153B',
    secondaryColor: '#2E236C',
    tertiaryColor: '#433D8B',
    fourthColor: '#C8ACD6',
    white: '#ffffff',
    black: '#000000',
  },
};

const mainDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryColor: '#17153B',
    secondaryColor: '#2E236C',
    tertiaryColor: '#433D8B',
    fourthColor: '#C8ACD6',
    white: '#ffffff',
    black: '#000000',
  },
};

const MainTheme = ({children}) => {
  const {lightTheme} = useAppContext();
  return (
    <PaperProvider theme={lightTheme ? mainLightTheme : mainDarkTheme}>
      {children}
    </PaperProvider>
  );
};

export default MainTheme;
