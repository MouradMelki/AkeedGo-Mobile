import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import Fonts from '../../constants/Fonts';
import Labels from '../../constants/Labels';
import {errMsg} from '../../constants/Messages';
import {useTheme} from '../../theme/ThemeContex';
import InputContainer from '../UI/InputContainer';
import LinkGrey from '../UI/LinkGrey';
import CustText from '../UI/CustText';
import CustTextGrey from '../UI/CustTextGrey';
import CustBotton from '../UI/CustButton';
import Card from '../UI/Card';
import Input from '../UI/Input';

const VerificationCode = props => {
  const {colors, isDark} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [countDown, setCountDown] = useState(props.countDown);
  const [enableResend, setEnableResend] = useState(false);
  const textInput = useRef();
  let clockCall = null;

  /*
   * purpose: controlling the countDown
   */
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countDown <= 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };

  const onResendOTP = () => {
    if (enableResend) {
      setCountDown(props.countDown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

  const nextHandler = async () => {
    if (props.formIsValid) {
      props.navigator.navigate(props.navigateTo);
    } else {
      Alert.alert(errMsg.invalidCode.message, error, [{text: Labels.button.OK}]);
    }
  };

  return (
    <View>
      <CustText
        style={{
          fontSize: 20,
          fontFamily: Fonts.helveticaBold,
        }}
        text={'Enter ' + props.lengthInput + '-digit code'}
      />
      <CustTextGrey
        style={{
          fontSize: 13,
        }}
        text={Labels.subPhrase.code + 'email'}
      />
      <InputContainer style={styles.inputContainer}>
        <View style={styles.invizInputContainer}>
          <Input
            required
            id={props.id}
            useRef={textInput}
            style={styles.input}
            minLength={props.lengthInput}
            onInputChange={props.onInputChange}
            placeholder={Labels.placeHolder.email}
            returnKeyType="done"
            keyboardType="number-pad"
            autoFocus={true}
            initiallyValid={false}
          />
        </View>
        {Array(props.lengthInput)
          .fill()
          .map((data, index) => (
            <CustBotton
              key={index}
              isLoading={isLoading}
              buttonTitle={
                props.code && props.code.length > 0 ? props.code[index] : ''
              }
              style={{
                ...styles.formContainer,
                backgroundColor: colors.background_light,
                borderColor:
                  index === props.code.length
                    ? colors.text_grey_dark
                    : colors.text_grey_light,
                ...props.formContainer,
              }}
              underlayColor={colors.background_light}
              styleText={{
                ...styles.staticInput,
                ...props.style,
                color: colors.text_dark,
              }}
              onPress={() => {
                textInput.current.focus();
              }}
            />
          ))}
      </InputContainer>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Card style={styles.nextContainer}>
          <CustBotton
            isLoading={isLoading}
            buttonTitle={Labels.button.verify}
            style={styles.nextButton}
            styleText={styles.nextText}
            onPress={nextHandler}
          />
        </Card>
      </View>
      <LinkGrey
        onPress={onResendOTP}
        labels={countDown === 0 ? 'Resend code' : 'Resend code in ' + countDown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 0,
    height: 40,
    fontSize: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: Fonts.helvetica,
  },
  nextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  invizInputContainer: {
    width: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  staticInput: {
    fontFamily: Fonts.helvetica,
    fontSize: 30,
    paddingHorizontal: 2,
  },
  formContainer: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 2,
  },
});

export default VerificationCode;
