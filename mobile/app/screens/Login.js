import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { login } from '../utils/AuthService';
import { setLoginInfo } from '../actions/dev';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  setLoginInfo = async ({ token, decodedToken, userId, userFirst }) => {
    if (token && decodedToken && userId && userFirst) {
      await this.props.dispatch(
        setLoginInfo({ token, decodedToken, userId, userFirst }),
      );
      this.props.navigation.navigate('Home', { userFirst });
    }
  };

  facilitateLogin = async () => {
    try {
      const { token, decodedToken, userId, userFirst } = await login();
      this.setLoginInfo({ token, decodedToken, userId, userFirst });
    } catch (err) {
      console.log('Login fail:', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Example: Auth0 login</Text>
        <Button title="Login with Auth0" onPress={this.facilitateLogin} />
      </View>
    );
  }
}

export default connect()(Login);
