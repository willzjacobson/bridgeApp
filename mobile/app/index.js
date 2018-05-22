import React, { Component } from 'react';
import { alert } from 'react-native';
import { Provider } from 'react-redux';

import { createRootNavigator } from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './config/store';
import { isLoggedIn } from './utils/AuthService';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    isLoggedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert('An error occurred', err.message));
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
