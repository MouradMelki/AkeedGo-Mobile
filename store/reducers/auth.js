import { AUTHENTICATE } from '../actions/auth';

const initialState = {
  token: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
