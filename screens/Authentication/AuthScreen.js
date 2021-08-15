import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {View, StyleSheet, Alert, Image, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Card from '../../components/UI/Card';
import Logo from '../../components/UI/Logo';
import Link from '../../components/UI/Link';
import Input from '../../components/UI/Input';
import Title from '../../components/UI/Title';
import Screen from '../../components/UI/Screen';
import LinkGrey from '../../components/UI/LinkGrey';
import CustBotton from '../../components/UI/CustButton';
import CustTextGrey from '../../components/UI/CustTextGrey';
import InputContainer from '../../components/UI/InputContainer';
import * as authActions from '../../store/actions/auth';
import Labels from '../../constants/Labels';
import Fonts from '../../constants/Fonts';
import HeaderTitles from '../../constants/HeaderTitles';
import {errMsg as errMsg} from '../../constants/Messages';
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

const AuthScreen = props => {
  const {colors, isDark} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [unhide, setUnhide] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: '',
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert(errMsg.errOccur, error, [{text: Labels.button.OK}]);
    }
  }, [error]);

  const authHandler = async () => {
    const action = authActions.login(
      formState.inputValues.username,
      formState.inputValues.password,
    );
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const forgotPassHandler = () => {
    console.log(Labels.link.forgotPassword);
  };

  const registrationHandler = async () => {
    props.navigation.navigate('Registration');
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
      <View style={styles.title}>
        <Logo />
        <Title />
      </View>
      <InputContainer style={styles.inputContainer}>
        <Card style={styles.cardAuthentication}>
          <Input
            id="username"
            placeholder={Labels.placeHolder.username}
            required
            minLength={5}
            onInputChange={inputChangeHandler}
          />
        </Card>
        <Card style={styles.cardAuthentication}>
          <Input
            id="password"
            placeholder={Labels.placeHolder.password}
            secureTextEntry={!unhide}
            required
            minLength={5}
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
        </Card>
        <Card style={styles.loginContainer}>
          <CustBotton
            isLoading={isLoading}
            buttonTitle={Labels.button.login}
            style={styles.loginButton}
            styleText={styles.loginText}
            onPress={authHandler}
          />
        </Card>
        <View>
          <LinkGrey
            onPress={forgotPassHandler}
            labels={Labels.link.forgotPassword}
          />
        </View>
      </InputContainer>
      <View style={styles.signupContainer}>
        <CustTextGrey text={Labels.subPhrase.signup} />
        <Link
          onPress={registrationHandler}
          labels={Labels.link.signup}
          style={{fontFamily: Fonts.helveticaBold}}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '40%',
    height: '40%',
  },
  title: {
    flex: Platform.OS === 'ios' ? 3 : 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardAuthentication: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width: '70%',
    marginBottom: 10,
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginBottom: 10,
  },
  loginButton: {
    fontSize: 8,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 20,
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '6%',
  },
  inputContainer: {
    flex: Platform.OS === 'ios' ? 3 : 2,
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5,
  }
});

export const screenOptions = {
  headerTitle: HeaderTitles.AuthScreen,
};

export default AuthScreen;
