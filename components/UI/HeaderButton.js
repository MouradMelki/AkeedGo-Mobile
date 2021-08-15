import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../theme/ThemeContex';

const CustomHeaderButton = props => {
  const {colors, isDark} = useTheme();
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={35}
      color={colors.primary}
    />
  );
};

export default CustomHeaderButton;
