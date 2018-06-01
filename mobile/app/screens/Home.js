import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { getUserInfoFromStorage } from '../utils/AuthService';

import { connectAlert } from '../components/Alert';
import { CardDeck } from '../components/Cards';
import { Header } from '../components/Header';
import { loadQuestionInstances } from '../actions/questionInstances';
import { setLoginInfo } from '../actions/login';

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
    marginTop: 70,
  },
});

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
    dispatch: PropTypes.func,
    error: PropTypes.string,
    userFirst: PropTypes.string,
    userId: PropTypes.string,
    token: PropTypes.string,
    questionInstances: PropTypes.array,
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

    this.props.navigation.setParams({ userFirst });

    return this.props.dispatch(
      loadQuestionInstances(this.props.token, this.props.userId),
    );
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

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

  render() {
    return (
      <View style={styles.container}>
        <CardDeck questions={this.props.questionInstances} />
        <Header onPress={this.handleOptionsPress} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.dev.error,
  userFirst: state.loginInfo.userFirst,
  userId: state.loginInfo.userId,
  token: state.loginInfo.token,
  questionInstances: state.questionInstances.questionInstances,
});

export default connect(mapStateToProps)(connectAlert(Home));
