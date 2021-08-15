import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Fonts from '../../constants/Fonts';
import {useTheme} from '../../theme/ThemeContex';

const CustText = props => {
  const {colors, isDark} = useTheme();

  return (
    <Text
      style={{
        ...styles.defaultLink,
        color: colors.text_grey_dark,
        ...props.style,
      }}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultLink: {
    fontSize: 15,
    fontFamily: Fonts.helvetica,
  },
});

export default CustText;
