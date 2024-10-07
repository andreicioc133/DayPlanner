import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS, ICON_SIZES} from '../utils/constants';
import {TouchableOpacity} from 'react-native';

const TaskCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.container,
          borderColor: isChecked ? COLORS.validGreen : COLORS.white,
          borderWidth: 1,
        }}
        onPress={() => setIsChecked(!isChecked)}>
        <Text
          style={{
            ...styles.text,
            color: COLORS.white,
          }}>
          asd
        </Text>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="pencil"
            iconColor={COLORS.white}
            size={ICON_SIZES?.buttonIcon}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="delete"
            iconColor={COLORS.white}
            size={ICON_SIZES?.buttonIcon}
            // style={{paddingLeft: 12}}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon={!isChecked ? 'check' : 'close'}
            iconColor={COLORS.white}
            size={ICON_SIZES?.buttonIcon}
            // style={{paddingLeft: 12}}
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    borderRadius: 50,
    height: 50,
    width: '95%',
    paddingLeft: 8,
    paddingRight: 10,
  },
  text: {
    flex: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TaskCard;
