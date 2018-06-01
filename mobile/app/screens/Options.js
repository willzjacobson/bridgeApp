import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { removeLoginInfo } from '../actions/login';
import { logout } from '../utils/AuthService';
import { ListItem, Separator } from '../components/List';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md'; // 'md' is prefix for android icons in Ionicons
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handleThemesPress = () => {
    console.log('Themes press');
  };

  facilitateLogout = async () => {
    await logout();
    this.props.dispatch(removeLoginInfo());
    this.props.navigation.navigate('SignedOut');
  };

  render() {
    return (
      <ScrollView>
        <ListItem
          text="themes"
          onPress={this.handleThemesPress}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-arrow-forward`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
        <Separator />
        <ListItem
          text="logout"
          onPress={this.facilitateLogout}
          customIcon={
            <Ionicons
              name={`${ICON_PREFIX}-hand`}
              color={ICON_COLOR}
              size={ICON_SIZE}
            />
          }
        />
      </ScrollView>
    );
  }
}

export default connect()(Options);
