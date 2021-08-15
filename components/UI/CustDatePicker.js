import React, {useReducer, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {useTheme} from '../../theme/ThemeContex';

const INPUT_CHANGE_DATE = 'INPUT_CHANGE_DATE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE_DATE:
      return {
        ...state,
        date: action.value,
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

const CustDatePicker = props => {
  const {colors, isDark} = useTheme();

  const getLocal = () => {
    return 'en-US';
  };

  const [inputState, dispatch] = useReducer(inputReducer, {
    date: props.date,
    isValid: false,
  });

  const {onInputChange, id} = props;

  const dateChangeHandler = itemValue => {
    let isValid = true;
    if (!Date.parse(itemValue)) {
      isValid = false;
    }
    dispatch({type: INPUT_CHANGE_DATE, value: itemValue, isValid: isValid});
    onInputChange(id, itemValue.toLocaleDateString(getLocal()), isValid);
  };

  return (
    <View style={styles.container}>
      <DatePicker
        date={inputState.date}
        onDateChange={dateChangeHandler}
        androidVariant={'nativeAndroid'}
        mode={'date'}
        locale={getLocal()}
        textColor={colors.text_dark}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  monthPicker: {flex: 3},
  dayPicker: {flex: 1},
  yearPicker: {flex: 2},
});

export default CustDatePicker;
