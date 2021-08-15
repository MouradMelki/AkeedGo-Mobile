import React from 'react';
import {Appearance, SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

import Step1Screen, {
  screenOptions as step1ScreenOptions,
} from '../screens/Registration/Step1';
import Step2Screen, {
  screenOptions as step2ScreenOptions,
} from '../screens/Registration/Step2';
import Step3Screen, {
  screenOptions as step3ScreenOptions,
} from '../screens/Registration/Step3';
import Step4Screen, {
  screenOptions as step4ScreenOptions,
} from '../screens/Registration/Step4';
import Step5Screen, {
  screenOptions as step5ScreenOptions,
} from '../screens/Registration/Step5';
import Step6Screen, {
  screenOptions as step6ScreenOptions,
} from '../screens/Registration/Step6';
import Step7Screen, {
  screenOptions as step7ScreenOptions,
} from '../screens/Registration/Step7';
import {useTheme} from '../theme/ThemeContex';
import Fonts from '../constants/Fonts';

const IoniconsHeaderButton = props => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={40}
    {...props}
    fontWeight={'bold'}
  />
);

const RegistorStackNavigator = createStackNavigator();

const RegistrationNavigator = () => {
  const {colors, isDark} = useTheme();
  const defaultNavOptions = {
    headerStyle: {
      backgroundColor: colors.background_light,
    },
    headerTitleStyle: {
      fontFamily: Fonts.helveticaBold,
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerTintColor: colors.primary,
    headerShown: true,
  };

  const defaultScreenOptions = {
    headerRight: () => (
      <SafeAreaView>
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="search"
            iconName="help-circle-outline"
            color={colors.primary}
          />
        </HeaderButtons>
      </SafeAreaView>
    ),
  };

  return (
    <RegistorStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <RegistorStackNavigator.Screen
        name="Step1"
        component={Step1Screen}
        options={step1ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step2"
        component={Step2Screen}
        options={step2ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step3"
        component={Step3Screen}
        options={step3ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step4"
        component={Step4Screen}
        options={step4ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step5"
        component={Step5Screen}
        options={step5ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step6"
        component={Step6Screen}
        options={step6ScreenOptions}
      />
      <RegistorStackNavigator.Screen
        name="Step7"
        component={Step7Screen}
        options={step7ScreenOptions}
      />
    </RegistorStackNavigator.Navigator>
  );
};

export default RegistrationNavigator;
