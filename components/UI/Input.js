import React, {useRef, useReducer, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {validate} from 'validate.js';

import Fonts from '../../constants/Fonts';
import {errMsg} from '../../constants/Messages';
import {useTheme} from '../../theme/ThemeContex';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const constraints = {
  emailValidation: {
    presence: {
      allowEmpty: false,
      message: '^' + errMsg.missingEmail.code,
    },
    email: {
      message: '^' + errMsg.invalidEmail.code,
    },
  },
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  const {colors, isDark} = useTheme();

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;

  const textChangeHandler = text => {
    dispatch({type: INPUT_BLUR});
    let isValid = true;
    if (id === 'phone' && text.length < props.minLength) {
      isValid = false;
    }
    if (id === 'email') {
      if (validate({emailValidation: text}, constraints)) {
        const validator = validate({emailValidation: text}, constraints);
        isValid = false;
        onInputChange('errMsgCode', validator.emailValidation[0], isValid);
      } else {
        onInputChange('errMsgCode', '', isValid);
      }
    }
    if (id === 'verificationCode') {
      isValid = !isNaN(text);
      console.log(isValid);
    }
    if (id === 'newPassword') {
      // contains at least one letter
      let containsLetter = new RegExp('(?=.*[a-zA-Z])');
      // contains at least one number
      let containsNumber = new RegExp('(?=.*[0-9])');
      // contains at least one special character
      let containsSpecialCharacter = new RegExp('(?=.*[!£$%^&#@])');
      // min Length
      let passMinLength = new RegExp('(?=^.{8,20}$)');

      isValid =
        passMinLength.test(text) &&
        containsSpecialCharacter.test(text) &&
        containsNumber.test(text) &&
        containsLetter.test(text);

      onInputChange('errMsgCode', '', isValid);
      if (!passMinLength.test(text)) {
        isValid = false;
        onInputChange('errMsgCode', errMsg.invalidPasswordLength.code, isValid);
      }

      if (
        !(
          containsSpecialCharacter.test(text) &&
          containsNumber.test(text) &&
          containsLetter.test(text)
        ) &&
        passMinLength.test(text)
      ) {
        isValid = false;
        onInputChange('errMsgCode', errMsg.invalidPassword.code, isValid);
      }
    }
    
    if (/VerificationCode/.test(id)){
      text = text.replace(/[^0-9]/g, "");
      if (text.length < props.minLength) isValid = false;
    }

    if (props.required && text.length < 1) {
      isValid = false;
      onInputChange('errMsgCode', errMsg.invalidInput.code, isValid);
    }

    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  return (
    <View
      style={{
        ...styles.formContainer,
        ...props.formContainerStyle,
        borderColor: colors.text_grey_dark,
      }}>
      <TextInput
        {...props}
        ref={props.useRef ? props.useRef : undefined}
        style={{...styles.input, ...props.style, color: colors.text_dark}}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        autoCapitalize="none"
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        placeholderTextColor={colors.text_grey_light}
        selectionColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: Fonts.helvetica,
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    height: 40,
  },
  formContainer: {
    width: '100%',
  },
});

export default Input;
