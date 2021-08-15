import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import {useTheme} from '../theme/ThemeContex';

const AppNavigator = props => {
  const {colors, isDark} = useTheme();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background_light,
      dark: isDark,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
      {/* {!isAuth && } */}
    </NavigationContainer>
  );
};

export default AppNavigator;
