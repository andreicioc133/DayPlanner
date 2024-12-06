import {useWindowDimensions} from 'react-native';

export const useOrientation = () => {
  const {width, height} = useWindowDimensions();
  const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

  return orientation;
};
