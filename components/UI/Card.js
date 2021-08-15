import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useTheme} from '../../theme/ThemeContex';

const Card = props => {
  const {colors, isDark} = useTheme();

  return (
    <View
      style={{
        ...styles.card,
        borderColor: colors.border_grey,
        backgroundColor: colors.background_light,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default Card;
