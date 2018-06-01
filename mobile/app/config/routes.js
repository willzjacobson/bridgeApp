import { StackNavigator, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Options from '../screens/Options';

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
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        const userFirst = navigation.getParam('userFirst');
        return userFirst ? { title: `Hello ${userFirst}!` } : null;
      },
    },
    Options: {
      screen: Options,
      navigationOptions: {
        title: 'Options',
      },
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen', // Makes navigation bar comes and goes with the screen (default on Android)
  },
);

export const createRootNavigator = (signedIn = false) =>
  createSwitchNavigator(
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
