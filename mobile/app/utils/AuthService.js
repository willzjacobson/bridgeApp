import { AuthSession } from 'expo';
import decode from 'jwt-decode';
import { AsyncStorage, Alert } from 'react-native';
import Auth0 from 'react-native-auth0';

import { auth0ClientId, auth0Domain, audience } from '../config/auth0';

const auth0 = new Auth0({ clientId: auth0ClientId, domain: auth0Domain });
const mutadedDomain = auth0Domain.replace(/\./g, ':');

/**
 * Converts an object to a query string.
 */

export const toQueryString = params =>
  `?${Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&')}`;

export async function getUserInfoFromStorage() {
  const [
    [, token],
    [, decodedToken],
    [, userId],
    [, userFirst],
  ] = await AsyncStorage.multiGet([
    'token',
    'decodedToken',
    'userId',
    'userFirst',
  ]);

  return {
    token,
    decodedToken: JSON.parse(decodedToken),
    userId,
    userFirst,
  };
}

export async function getUserInfoFromAuth0(token) {
  const userInfo = await auth0.auth.userInfo({ token });
  const userFirst = userInfo[mutadedDomain].first;
  const userId = userInfo.sub;

  const decodedToken = decode(token);

  await AsyncStorage.multiSet([
    ['token', token],
    ['decodedToken', JSON.stringify(decodedToken)],
    ['userId', userId],
    ['userFirst', userFirst],
  ]);

  return {
    token,
    decodedToken,
    userId,
    userFirst,
  };
}

export const handleParams = async ({
  params: { error, error_description, access_token } = {},
  type,
}) => {
  if (type !== 'success' || error) {
    Alert.alert(
      'Error',
      error_description || 'something went wrong while logging in',
    );
    return {};
  }

  return getUserInfoFromAuth0(access_token);
};

export const login = async () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  const result = await AuthSession.startAsync({
    authUrl: `${auth0Domain}/authorize${toQueryString({
      audience,
      client_id: auth0ClientId,
      response_type: 'token',
      redirect_uri: redirectUrl,
    })}`,
  });

  return handleParams(result);
};

function isTokenExpired(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date < new Date();
}

export async function logout() {
  await AsyncStorage.multiRemove(['user', 'token', 'userFirst']);
}

export async function isLoggedIn() {
  const accessToken = await AsyncStorage.getItem('token');
  return !!accessToken && !isTokenExpired(accessToken);
}
