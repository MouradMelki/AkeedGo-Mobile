import React, {useState, useRef, useEffect, useReducer, useCallback} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import CustTextGrey from '../../components/UI/CustTextGrey';
import InputContainer from '../../components/UI/InputContainer';
import {useTheme} from '../../theme/ThemeContex';

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

const Step6 = props => {
  const {colors, isDark} = useTheme();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      newPassword: '',
    },
    inputValidities: {
      newPassword: false,
    },
    formIsValid: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unhide, setUnhide] = useState(false);
  const [isValidLength, setIsValidLength] = useState(false);
  const [isValidCharacters, setIsValidCharacters] = useState(false);
  const textInput = useRef();

  const nextHandler = async () => {
    if (formState.formIsValid) {
      props.navigation.navigate('Step7');
    } else {
      switch (formState.inputValues.errMsgCode) {
        case errMsg.invalidPassword.code:
          Alert.alert(errMsg.invalidPassword.message, error, [{text: Labels.button.OK}]);
          break;
        case errMsg.invalidPasswordLength.code:
          Alert.alert(errMsg.invalidPasswordLength.message, error, [
            {text: Labels.button.OK},
          ]);
          break;
      }
    }
  };

  useEffect(() => {
    switch (formState.inputValues.errMsgCode) {
      case errMsg.invalidPassword.code:
        setIsValidLength(true);
        setIsValidCharacters(false);
        break;
      case errMsg.invalidPasswordLength.code:
        setIsValidLength(false);
        setIsValidCharacters(false);
        break;
    }

    if (formState.formIsValid) {
      setIsValidLength(true);
      setIsValidCharacters(true);
    }
  });

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
          marginHorizontal: 40,
          marginVertical: 20,
        }}>
        <CustText
          text={Labels.phrase.newPassword}
          style={{
            fontSize: 20,
            fontFamily: Fonts.helveticaBold,
          }}
        />
        <InputContainer style={styles.inputContainer}>
          <Input
            id="newPassword"
            useRef={textInput}
            placeholder={Labels.placeHolder.newPassword}
            secureTextEntry={!unhide}
            required
            minLength={8}
            maxLength={20}
            onInputChange={inputChangeHandler}
            formContainerStyle={styles.formContainer}
          />
          {unhide ? (
            <Ionicons
              size={25}
              title="checkMark"
              name="eye-off-outline"
              color={colors.text_grey_dark}
              style={{marginRight: 5}}
              onPress={() => setUnhide(false)}
            />
          ) : (
            <Ionicons
              size={25}
              title="checkMark"
              name="eye-outline"
              color={colors.text_grey_dark}
              style={{marginRight: 5}}
              onPress={() => setUnhide(true)}
            />
          )}
        </InputContainer>
        <View
          style={{
            marginTop: 10,
          }}>
          <CustText
            style={{
              fontFamily: Fonts.helveticaBold,
            }}
            text={Labels.subPhrase.newPassword1}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              size={15}
              title="checkMark"
              name="checkmark-circle-outline"
              color={isValidLength ? colors.valid : colors.text_grey_dark}
              style={{marginRight: 5}}
            />
            <CustTextGrey text={Labels.subPhrase.newPassword2} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              size={15}
              title="checkMark"
              name="checkmark-circle-outline"
              color={isValidCharacters ? colors.valid : colors.text_grey_dark}
              style={{marginRight: 5}}
            />
            <CustTextGrey text={Labels.subPhrase.newPassword3} />
          </View>
        </View>
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
    marginVertical: 0,
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

export default Step6;
