import {
  LOAD_RESOURCE,
  LOAD_RESOURCE_RESULT,
  LOAD_RESOURCE_ERROR,
  LOAD_USERS,
  LOAD_USERS_RESULT,
  LOAD_USERS_ERROR,
  SET_LOGIN_INFO,
  REMOVE_LOGIN_INFO,
} from '../actions/dev';

const initialState = {
  defaultResource: 'questions',
  loadingQuestions: false,
  loadingNewts: false,
  loadingOrgasms: false,
  loadingUsers: false,
  questions: [],
  newts: [],
  orgasms: [],
  users: [],
  error: null,
  token: null,
  decodedToken: null,
  userId: null,
  userFirst: null,
};

export default (state = initialState, action) => {
  const { resource } = action;
  const loadingResource = resource
    ? `loading${action.resource.charAt(0).toUpperCase()}${action.resource.slice(
        1,
      )}`
    : null;

  switch (action.type) {
    case LOAD_RESOURCE:
      return {
        ...state,
        [loadingResource]: true,
      };
    case LOAD_RESOURCE_RESULT:
      return {
        ...state,
        [loadingResource]: false,
        [action.resource]: action.result,
      };
    case LOAD_RESOURCE_ERROR:
      return {
        ...state,
        [loadingResource]: false,
        error: action.error,
      };
    case LOAD_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case LOAD_USERS_RESULT:
      return {
        ...state,
        loadingUsers: false,
        users: action.result,
      };
    case LOAD_USERS_ERROR:
      return {
        ...state,
        loadingUsers: false,
        error: action.error,
      };
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
