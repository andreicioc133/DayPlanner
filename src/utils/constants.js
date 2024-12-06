import {Platform} from 'react-native';

export const COLORS = {
  primaryColor: '#2E236C',
  secondaryColor: '#2E236C',
  tertiaryColor: '#433D8B',
  fourthColor: '#cb6ce6',
  modalBackground: '#6808A1',
  white: '#ffffff',
  black: '#000000',
  validGreen: '#23DC3D',
  lightGrey: '#D3D3D3',
  lightGreyRGBA: 'rgba(211, 211, 211, 0.5)',
};

export const COLORS_SECONDARY = {};

export const FONT_SIZES = {
  h1: Platform?.isPad ? 40 : 36,
  h2: Platform?.isPad ? 32 : 28,
  h3: Platform?.isPad ? 28 : 24,
  text: Platform?.isPad ? 22 : 16,
};

export const ELEMENTS_DIMENSIONS = {
  headerHeight: 60,
};

export const ICON_SIZES = {
  headerIcon: Platform?.isPad ? 50 : 36,
  buttonIcon: Platform?.isPad ? 36 : 26,
};
