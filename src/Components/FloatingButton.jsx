import * as React from 'react';
import {FAB, Portal, PaperProvider} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {COLORS} from '../utils/constants';

const FloatingButton = () => {
  const theme = useTheme();
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        fabStyle={{
          backgroundColor: COLORS.tertiaryColor,
          borderRadius: 50,
        }}
        color={theme.colors.white}
        icon={open ? 'minus' : 'plus'}
        backdropColor="transparent"
        actions={[
          {
            icon: 'star',
            label: 'Star',
            color: theme.colors.white,
            style: {
              backgroundColor: COLORS.tertiaryColor,
              borderRadius: 50,
            },
            labelTextColor: theme.colors.white,
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            color: theme.colors.white,
            style: {
              backgroundColor: COLORS.tertiaryColor,
              borderRadius: 50,
            },
            labelTextColor: theme.colors.white,
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'bell',
            label: 'Remind',
            color: theme.colors.white,
            style: {
              backgroundColor: COLORS.tertiaryColor,
              borderRadius: 50,
            },
            labelTextColor: theme.colors.white,
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FloatingButton;
