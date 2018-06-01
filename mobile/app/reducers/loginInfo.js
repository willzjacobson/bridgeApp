import { SET_LOGIN_INFO, REMOVE_LOGIN_INFO } from '../actions/dev';

const initialState = {
  token: null,
  decodedToken: null,
  userId: null,
  userFirst: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_INFO:
      return {
        ...state,
        token: action.token,
        decodedToken: action.decodedToken,
        userId: action.userId,
        userFirst: action.userFirst,
      };
    case REMOVE_LOGIN_INFO:
      return {
        ...state,
        token: null,
        decodedToken: null,
        userId: null,
        userFirst: null,
      };
    default:
      return state;
  }
};
