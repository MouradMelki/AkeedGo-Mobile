import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import RegistrationNavigator from './RegistrationNavigator';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/Authentication/AuthScreen';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator
          screenOptions={{
            headerShown: false
          }}>
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={authScreenOptions}
            />
            <AuthStackNavigator.Screen
                name="Registration"
                component={RegistrationNavigator}
            />
        </AuthStackNavigator.Navigator>
    )
}

export default AuthNavigator;