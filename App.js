import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {AppearanceProvider} from 'react-native-appearance';

import AppNavigator from './navigation/AppNavigator';
import ThemeProvider from './theme/ThemeContex';
import authReducer from './store/reducers/auth';

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
      <AppearanceProvider>
        <ThemeProvider>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </ThemeProvider>
      </AppearanceProvider>
  );
};
export default App;
