import { StackNavigator, SwitchNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Home from '../screens/Home';

export const SignedOut = StackNavigator(
  {
    Login: { screen: Login },
  },
  {
    headerMode: 'screen',
  },
);

export const SignedIn = StackNavigator(
  {
    Home: { screen: Home },
  },
  {
    headerMode: 'screen',
  },
);

export const createRootNavigator = (signedIn = false) =>
  SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    },
  );
