import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Fonts from '../../constants/Fonts';
import {useTheme} from '../../theme/ThemeContex';

const Link = props => {
  const {colors, isDark} = useTheme();

  const onPressHandler = () => {
    props.onPress();
  };

  return (
    <Text
      style={{
        ...styles.defaultLink,
        color: colors.text_grey_dark,
        ...props.style,
      }}
      onPress={onPressHandler}>
      {props.labels}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultLink: {
    fontSize: 15,
    fontFamily: Fonts.helvetica,
  },
});

export default Link;
