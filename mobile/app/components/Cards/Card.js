import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';

import styles from './styles';

class Card extends Component {
  static propTypes = {
    question: PropTypes.Object,
    submitQuestion: PropTypes.func,
  };

  submitQuestion = () => {
    this.props.submitQuestion(this.props.question.id);
  };

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{JSON.stringify(this.props.question)}</Text>
        <Button
          title="Submit"
          onPress={this.submitQuestion}
          disabled={this.props.submittingQuestion}
        />
      </View>
    );
  }
}

// class Card extends Component {
//   static propTypes = {
//     question: PropTypes.object,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{JSON.stringify(this.props.question)}</Text>
//       </View>
//     );
//   }
// }

export default Card;
