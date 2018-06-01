export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
export const REMOVE_LOGIN_INFO = 'REMOVE_LOGIN_INFO';

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
