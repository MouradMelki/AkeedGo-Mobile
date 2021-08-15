import React, {useRef, useReducer, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Fonts from '../../constants/Fonts';
import {useTheme} from '../../theme/ThemeContex';

const InputStatic = props => {
  const {colors, isDark} = useTheme();
  const textInput = useRef();

  return (
    <View
      style={{
        ...styles.formContainer,
        ...props.formContainer,
        borderColor: colors.text_grey_dark,
      }}>
      <Text
        {...props}
        style={{
          ...styles.input,
          ...props.style,
          color: colors.text_dark,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: Fonts.helvetica,
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    height: 40,
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default InputStatic;
