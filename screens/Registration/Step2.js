import React, {useState, useRef, useEffect, useReducer, useCallback} from 'react';
import {StyleSheet, View, Alert, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Fonts from '../../constants/Fonts';
import Labels from '../../constants/Labels';
import {errMsg} from '../../constants/Messages';
import HeaderTitles from '../../constants/HeaderTitles';
import Card from '../../components/UI/Card';
import Link from '../../components/UI/Link';
import Input from '../../components/UI/Input';
import Screen from '../../components/UI/Screen';
import CustText from '../../components/UI/CustText';
import CustBotton from '../../components/UI/CustButton';
import HeaderButton from '../../components/UI/HeaderButton';
import CustTextGrey from '../../components/UI/CustTextGrey';
import InputContainer from '../../components/UI/InputContainer';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Step2 = props => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const textInput = useRef();

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const nextHandler = async () => {
    if (formState.formIsValid) {
      props.navigation.navigate('Step3');
    } else {
      switch (formState.inputValues.errMsgCode) {
        case errMsg.invalidEmail.code:
          Alert.alert(errMsg.invalidEmail.message, error, [{text: Labels.button.OK}]);
          break;
        case errMsg.missingEmail.code:
          Alert.alert(errMsg.missingEmail.message, error, [{text: Labels.button.OK}]);
          break;
        default:
          Alert.alert(errMsg.invalidInput.message, error, [{text: Labels.button.OK}]);
      }
    }
  };

  return (
    <Screen>
      <View
        style={{
          marginHorizontal: 40,
          marginVertical: 30,
        }}>
        <CustText
          text={Labels.phrase.email}
          style={{
            fontSize: 20,
            fontFamily: Fonts.helveticaBold,
          }}
        />
        <InputContainer style={styles.inputContainer}>
          <Input
            id="email"
            useRef={textInput}
            placeholder={Labels.placeHolder.email}
            keyboardType="email-address"
            required
            minLength={10}
            onInputChange={inputChangeHandler}
            formContainerStyle={styles.formContainer}
          />
        </InputContainer>
      </View>
      <View style={{alignItems: 'center'}}>
        <Card style={styles.nextContainer}>
          <CustBotton
            isLoading={isLoading}
            buttonTitle={Labels.button.code}
            style={styles.nextButton}
            styleText={styles.nextText}
            onPress={nextHandler}
          />
        </Card>
      </View>
      <View
        style={{
          marginHorizontal: 40,
          marginTop: 10,
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text
          style={{
            textAlign: 'justify',
            flexShrink: 1,
          }}>
          <CustTextGrey style={{fontSize: 12}} text={Labels.subPhrase.tos_1} />
          <Link style={{fontSize: 12}} labels={Labels.link.tos} />
          <CustTextGrey style={{fontSize: 12}} text={Labels.subPhrase.tos_2} />
          <Link style={{fontSize: 12}} labels={Labels.link.privacyPolicy} />
          <CustTextGrey style={{fontSize: 12}} text={Labels.subPhrase.tos_3} />
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  nextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
  },
  nextButton: {
    fontSize: 8,
  },
  nextText: {
    textAlign: 'center',
    fontSize: 20,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
  },
});

export const screenOptions = navData => {
  return {
    headerTitle: HeaderTitles.Registration,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="backButton"
          iconName="chevron-back-outline"
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="helpButton" iconName="help-circle-outline" />
      </HeaderButtons>
    ),
  };
};

export default Step2;
