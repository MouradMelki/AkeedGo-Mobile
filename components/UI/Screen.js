import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {useTheme} from '../../theme/ThemeContex';

const Screen = props => {
  const {colors, isDark} = useTheme();

  return (
    <SafeAreaView
      style={{
        ...styles.defaultScreen,
        ...props.style,
        backgroundColor: colors.background_light,
      }}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle={colors.iosBarStyle} />
      ) : (
        <StatusBar backgroundColor="#760D0D" barStyle="light-content" />
      )}
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback
          onPress={props.onPress ? props.onPress : Keyboard.dismiss}>
          <View style={{flex: 1}}>{props.children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  defaultScreen: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avoidingView: {
    flex: 1,
    width: '100%',
  },
});

export default Screen;
