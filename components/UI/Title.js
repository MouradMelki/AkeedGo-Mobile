import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Labels from '../../constants/Labels';
import Fonts from '../../constants/Fonts';

import {useTheme} from '../../theme/ThemeContex';

const Title = props => {
  const {colors, isDark} = useTheme();

  return (
    <View style={props.style}>
      <Text
        style={{...styles.title, color: colors.primary, ...props.textStyle}}>
        {Labels.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.markerFelt,
    fontSize: 50,
  },
});

export default Title;
