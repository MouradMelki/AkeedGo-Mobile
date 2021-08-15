import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useTheme} from '../../theme/ThemeContex';

const InputContainer = props => {
  const {colors, isDark} = useTheme();

  return (
    <View
      style={{
        ...styles.inputContainer,
        ...props.style,
        borderColor: colors.text_grey_dark,
      }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputContainer;
