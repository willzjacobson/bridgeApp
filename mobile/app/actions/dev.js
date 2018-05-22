export const LOAD_RESOURCE = 'LOAD_RESOURCE';
export const LOAD_RESOURCE_RESULT = 'LOAD_RESOURCE_RESULT';
export const LOAD_RESOURCE_ERROR = 'LOAD_RESOURCE_ERROR';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_RESULT = 'LOAD_USERS_RESULT';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
export const REMOVE_LOGIN_INFO = 'REMOVE_LOGIN_INFO';

export const loadResource = (resource, token) => ({
  type: LOAD_RESOURCE,
  resource,
  token,
});

export const loadUsers = token => ({
  type: LOAD_USERS,
  token,
});

export const setLoginInfo = ({ token, decodedToken, userId, userFirst }) => ({
  type: SET_LOGIN_INFO,
  token,
  decodedToken,
  userId,
  userFirst,
});

export const removeLoginInfo = () => ({
  type: REMOVE_LOGIN_INFO,
});
