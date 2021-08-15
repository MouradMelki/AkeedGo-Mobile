import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Fonts from '../../constants/Fonts';
import Labels from '../../constants/Labels';
import {errMsg} from '../../constants/Messages';
import HeaderTitles from '../../constants/HeaderTitles';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Screen from '../../components/UI/Screen';
import CustText from '../../components/UI/CustText';
import CustBotton from '../../components/UI/CustButton';
import HeaderButton from '../../components/UI/HeaderButton';
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

const Step4 = props => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: '',
      lastName: '',
    },
    inputValidities: {
      firstName: false,
      lastName: false,
    },
    formIsValid: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const textInput = useRef();

  const nextHandler = async () => {
    if (formState.formIsValid) {
      props.navigation.navigate('Step5');
    } else {
      Alert.alert(errMsg.invalidInput.message, error, [{text: Labels.button.OK}]);
    }
  };

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
        <CustText
          text={Labels.phrase.fullName}
          style={{
            fontSize: 20,
            fontFamily: Fonts.helveticaBold,
          }}
        />
        <InputContainer style={styles.inputContainer}>
          <Input
            id="firstName"
            useRef={textInput}
            placeholder={Labels.placeHolder.firstName}
            required
            onInputChange={inputChangeHandler}
            formContainerStyle={styles.formContainer}
          />
          <Input
            id="lastName"
            placeholder={Labels.placeHolder.lastName}
            required
            onInputChange={inputChangeHandler}
            formContainerStyle={styles.formContainer}
          />
        </InputContainer>
      </View>
      <View style={{alignItems: 'center'}}>
        <Card style={styles.nextContainer}>
          <CustBotton
            isLoading={isLoading}
            buttonTitle={Labels.button.next}
            style={styles.nextButton}
            styleText={styles.nextText}
            onPress={nextHandler}
          />
        </Card>
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
    marginVertical: 10,
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
    flex: 1,
    marginHorizontal: 5,
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
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

export default Step4;
