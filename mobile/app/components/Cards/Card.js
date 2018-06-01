import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import styles from './styles';

const Card = props => (
  <View style={styles.card}>
    <Text style={styles.text}>{props.card}</Text>
  </View>
);

Card.propTypes = {
  card: PropTypes.string,
};
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
