import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import {
  isLoggedIn,
  logout,
  getUserInfoFromStorage,
} from '../utils/AuthService';

import { connectAlert } from '../components/Alert';
import {
  loadResource,
  loadUsers,
  setLoginInfo,
  removeLoginInfo,
} from '../actions/dev';

const styles = StyleSheet.create({
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

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    loadingQuestions: PropTypes.bool,
    loadingNewts: PropTypes.bool,
    loadingOrgasms: PropTypes.bool,
    loadingUsers: PropTypes.bool,
    questions: PropTypes.array,
    newts: PropTypes.array,
    orgasms: PropTypes.array,
    users: PropTypes.array,
    error: PropTypes.string,
    alertWithType: PropTypes.func,
    dispatch: PropTypes.func,
    userFirst: PropTypes.string,
    token: PropTypes.string,
  };

  async componentDidMount() {
    const {
      token,
      decodedToken,
      userId,
      userFirst,
    } = await getUserInfoFromStorage();

    this.setLoginInfo({
      token,
      decodedToken,
      userId,
      userFirst,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error !== this.props.error) {
      this.props.alertWithType('error', 'Error', nextProps.error);
    }
  }

  setLoginInfo = async ({ token, decodedToken, userId, userFirst }) => {
    if (token && decodedToken && userId && userFirst) {
      await this.props.dispatch(
        setLoginInfo({ token, decodedToken, userId, userFirst }),
      );
    }
  };

  getResource = async resource => {
    if (!(await isLoggedIn())) {
      return this.facilitateLogout();
    }

    return this.props.dispatch(loadResource(resource, this.props.token));
  };

  getUsers = async () => {
    if (!(await isLoggedIn())) {
      return this.facilitateLogout();
    }
    return this.props.dispatch(loadUsers(this.props.token));
  };

  facilitateLogout = async () => {
    await logout();
    this.props.dispatch(removeLoginInfo());
    this.props.navigation.navigate('SignedOut');
  };

  render() {
    const questions = this.props.questions ? (
      <Text>questions: {JSON.stringify(this.props.questions)}</Text>
    ) : this.props.loadingQuestions ? (
      '...'
    ) : null;

    const newts = this.props.newts ? (
      <Text>newts: {JSON.stringify(this.props.newts)}</Text>
    ) : this.props.loadingNewts ? (
      '...'
    ) : null;

    const orgasms = this.props.orgasms ? (
      <Text>orgasms: {JSON.stringify(this.props.orgasms)}</Text>
    ) : this.props.loadingOrgasms ? (
      '...'
    ) : null;

    const users = this.props.users ? (
      <Text>Users: {JSON.stringify(this.props.users)}</Text>
    ) : this.props.loadingUsers ? (
      '...'
    ) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello {this.props.userFirst}</Text>
        <Button
          title="Logout"
          style={styles.title}
          onPress={this.facilitateLogout}
        />
        <Button
          title="Get Questions"
          onPress={() => this.getResource('questions')}
        />
        <Button title="Get Newts" onPress={() => this.getResource('newts')} />
        <Button
          title="Get Orgasms"
          onPress={() => this.getResource('orgasms')}
        />
        <Button title="Get Users" onPress={this.getUsers} />
        {questions}
        {newts}
        {orgasms}
        {users}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loadingQuestions: state.dev.loadingQuestions,
  loadingNewts: state.dev.loadingNewts,
  loadingOrgasms: state.dev.loadingOrgasms,
  loadingUsers: state.dev.loadingUsers,
  questions: state.dev.questions,
  newts: state.dev.newts,
  orgasms: state.dev.orgasms,
  users: state.dev.users,
  error: state.dev.error,
  userFirst: state.dev.userFirst,
  token: state.dev.token,
});

export default connect(mapStateToProps)(connectAlert(Home));
