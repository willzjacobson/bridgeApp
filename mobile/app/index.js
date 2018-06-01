import React, { Component } from 'react';
import { alert } from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { createRootNavigator } from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './config/store';
import { isLoggedIn } from './utils/AuthService';

EStyleSheet.build({
  $border: '#E2E2E2',
  $darkText: '#343434',
  $inputText: '#797979',
  $white: '#ffffff',
  $black: '#000000',
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  async componentDidMount() {
    try {
      const signedIn = await isLoggedIn();
      this.setState({ signedIn, checkedSignIn: true });
    } catch (err) {
      alert('An error occurred', err.message);
    }
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);

    if (!checkedSignIn) return null;

    return (
      <Provider store={store}>
        <AlertProvider>
          <Layout />
        </AlertProvider>
      </Provider>
    );
  }
}
