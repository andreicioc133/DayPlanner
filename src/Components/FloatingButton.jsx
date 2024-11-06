import * as React from 'react';
import {FAB, Portal} from 'react-native-paper';
import {COLORS} from '../utils/constants';
import {useAppContext} from '../Store';
import {Alert} from 'react-native';

const FloatingButton = () => {
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
        backdropColor={COLORS?.lightGrey}
        color={COLORS.primaryColor}
        icon={open ? 'minus' : 'plus'}
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
