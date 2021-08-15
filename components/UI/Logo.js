import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {useTheme} from '../../theme/ThemeContex';

const CustText = props => {
  const {colors, isDark} = useTheme();

  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/Phoenix.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginTop: 70,
  },
});

export default CustText;
