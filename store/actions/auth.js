
import Config from 'react-native-config';
export const AUTHENTICATE = 'AUTHENTICATE';

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      Config.API_URL + '/api/user/v1/authenticate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    console.log(data);
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    // const resData = await response.json();
    // console.log(resData);
    console.log("data");

    dispatch({
      type: AUTHENTICATE,
      token: resData.access_token
    });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
  };
};
