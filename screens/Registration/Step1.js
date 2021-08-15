import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Fonts from '../../constants/Fonts';
import Labels from '../../constants/Labels';
import {errMsg} from '../../constants/Messages';
import HeaderTitles from '../../constants/HeaderTitles';
import Card from '../../components/UI/Card';
import Screen from '../../components/UI/Screen';
import CustText from '../../components/UI/CustText';
import CustBotton from '../../components/UI/CustButton';
import InputStatic from '../../components/UI/InputStatic';
import HeaderButton from '../../components/UI/HeaderButton';
import CustTextGrey from '../../components/UI/CustTextGrey';
import CustDatePicker from '../../components/UI/CustDatePicker';

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

const Step1 = props => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      date: Labels.placeHolder.date,
      year: 2000,
      month: 8,
      day: 8,
    },
    inputValidities: {
      date: false,
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

  const nextHandler = async () => {
    if (formState.formIsValid) {
      props.navigation.navigate('Step2');
    } else {
      Alert.alert(errMsg.invalidInput.message, error, [{text: Labels.button.OK}]);
    }
  };

  return (
    <Screen>
      <View style={styles.dateInputContainer}>
        <View
          style={{
            marginHorizontal: 40,
            marginVertical: 30,
          }}>
          <CustText
            text={Labels.phrase.birthday}
            style={{
              fontSize: 20,
              fontFamily: Fonts.helveticaBold,
            }}
          />
          <CustTextGrey text={Labels.subPhrase.birthday} />
          <InputStatic>{formState.inputValues.date}</InputStatic>
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
      </View>
      <View style={styles.datePickerContainer}>
        <CustDatePicker
          date={
            new Date(
              formState.inputValues.year,
              formState.inputValues.month,
              formState.inputValues.day,
            )
          }
          minimumDate={new Date('1950-01-01')}
          maximumDate={
            new Date(
              new Date().getFullYear() - 10,
              new Date().getMonth(),
              new Date().getDay(),
            )
          }
          id="date"
          onInputChange={inputChangeHandler}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInputContainer: {
    flex: 2,
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

export default Step1;
