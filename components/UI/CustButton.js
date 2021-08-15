import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableHighlight,
} from 'react-native';

import Fonts from '../../constants/Fonts';
import {useTheme} from '../../theme/ThemeContex';

const CustButton = props => {
  const {colors, isDark} = useTheme();

  const onPressHandler = () => {
    props.onPress();
  };

  return props.isLoading ? (
    <ActivityIndicator size="large" color={colors.primary} />
  ) : (
    <TouchableHighlight
      {...props}
      underlayColor={
        props.underlayColor ? props.underlayColor : colors.primary_light
      }
      onPress={onPressHandler}
      style={{
        ...styles.buttonContainer,
        backgroundColor: colors.primary,
        ...props.style,
      }}
      activeOpacity={1}>
      <Text style={[styles.buttonText, props.styleText]}>
        {props.buttonTitle}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    fontFamily: Fonts.helvetica,
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: Fonts.helveticaBold,
    color: 'white',
  },
});

export default CustButton;
