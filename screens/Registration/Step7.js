import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Contacts from 'react-native-contacts';

import Fonts from '../../constants/Fonts';
import Labels from '../../constants/Labels';
import {errMsg} from '../../constants/Messages';
import Card from '../../components/UI/Card';
import Screen from '../../components/UI/Screen';
import CustText from '../../components/UI/CustText';
import CustBotton from '../../components/UI/CustButton';
import HeaderButton from '../../components/UI/HeaderButton';
import CustTextGrey from '../../components/UI/CustTextGrey';
import {useTheme} from '../../theme/ThemeContex';

const Step7 = props => {
  const {colors, isDark} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const syncHandler = async () => {
    setIsLoading(true);
    // console.log(Contacts.getContactsByEmailAddress);
    try {
      console.log(Contacts.getContactsByEmailAddress);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    // props.navigation.navigate('Step7');
  };

  return (
    <Screen>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 40,
          marginVertical: 20,
        }}>
        <CustText
          text={Labels.phrase.sync}
          style={{
            fontSize: 20,
            fontFamily: Fonts.helveticaBold,
          }}
        />
      </View>
      <View
        style={{
          ...styles.syncContainer,
          marginTop: 10,
        }}>
        <MaterialIcons
          size={80}
          title="contacts"
          name="groups"
          color={colors.primary_light}
        />
        <CustText
          style={{
            fontFamily: Fonts.helveticaBold,
          }}
          text={Labels.subPhrase.sync1}
        />
        <CustTextGrey
          style={{
            paddingHorizontal: 30,
          }}
          text={Labels.subPhrase.sync2}
        />
      </View>
      <View
        style={{
          ...styles.syncContainer,
          paddingBottom: 20,
        }}>
        <Card style={styles.nextContainer}>
          <CustBotton
            isLoading={isLoading}
            buttonTitle={Labels.button.sync}
            style={styles.syncButton}
            styleText={styles.syncText}
            onPress={syncHandler}
          />
        </Card>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  syncButton: {
    fontSize: 8,
  },
  syncText: {
    textAlign: 'center',
    fontSize: 20,
  },
  nextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginVertical: 0,
  },
  nextButton: {
    marginLeft: 8,
    fontSize: 8,
  },
  nextText: {
    textAlign: 'center',
    fontSize: 20,
  },
  syncContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
  },
});

export const screenOptions = navData => {
  const {colors, isDark} = useTheme();
  return {
    headerTitle: '',
    headerLeft: () => (
      <CustBotton
        buttonTitle={Labels.button.skip}
        style={{...styles.nextButton, backgroundColor: colors.background_light}}
        styleText={{...styles.nextText, color: colors.primary}}
        onPress={() => {
          navData.navigation.navigate('Step7');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="helpButton" iconName="help-circle-outline" />
      </HeaderButtons>
    ),
  };
};

export default Step7;
