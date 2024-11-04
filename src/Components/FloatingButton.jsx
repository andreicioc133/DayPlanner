import * as React from 'react';
import {FAB, Portal, PaperProvider} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {COLORS} from '../utils/constants';
import {useAppContext} from '../Store';
import {Alert} from 'react-native';

const FloatingButton = () => {
  const theme = useTheme();
  const [state, setState] = React.useState({open: false});

  const {setIsTaskModalVisible} = useAppContext();

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        fabStyle={{
          backgroundColor: COLORS.lightGrey,
          borderRadius: 50,
        }}
        color={COLORS.primaryColor}
        icon={open ? 'minus' : 'plus'}
        // backdropColor="transparent"
        actions={[
          {
            icon: 'plus',
            label: 'Add new task',
            color: COLORS.white,
            style: {
              backgroundColor: COLORS.tertiaryColor,
              borderRadius: 50,
            },
            labelTextColor: COLORS.primaryColor,
            onPress: () => setIsTaskModalVisible(true),
          },
          {
            icon: 'plus',
            label: 'Add multiple tasks',
            color: COLORS.white,
            style: {
              backgroundColor: COLORS.tertiaryColor,
              borderRadius: 50,
            },
            labelTextColor: COLORS.primaryColor,
            onPress: () => Alert.alert('Feature is coming soon!'),
          },
          // {
          //   icon: 'bell',
          //   label: 'Remind',
          //   color: theme.colors.white,
          //   style: {
          //     backgroundColor: COLORS.tertiaryColor,
          //     borderRadius: 50,
          //   },
          //   labelTextColor: theme.colors.white,
          //   onPress: () => console.log('Pressed notifications'),
          // },
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
