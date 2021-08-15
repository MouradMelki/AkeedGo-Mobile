import React, {useState, useReducer, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderTitles from '../../constants/HeaderTitles';
import Screen from '../../components/UI/Screen';
import HeaderButton from '../../components/UI/HeaderButton';
import VerificationCode from '../../components/User/VerificationCode';

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

const Step3 = props => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      registrationVerificationCode: '',
    },
    inputValidities: {
      registrationVerificationCode: false,
    },
    formIsValid: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <Screen>
      <View
        style={{
          margin: 40,
        }}>
        <VerificationCode
          lengthInput={6}
          countDown={60}
          onInputChange={inputChangeHandler}
          navigateTo={'Step4'}
          navigator={props.navigation}
          formIsValid={formState.formIsValid}
          code={formState.inputValues.registrationVerificationCode}
          id={'registrationVerificationCode'}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contactInputContainer: {
    flex: 1,
  },
  nextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginBottom: 10,
  },
  nextButton: {
    fontSize: 8,
  },
  nextText: {
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    width: 0,
    height: 0,
    fontSize: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  formContainer: {
    width: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staticInput: {
    textAlign: 'center',
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

export default Step3;
