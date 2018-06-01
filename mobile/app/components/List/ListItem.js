import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const ListItem = ({ text, customIcon, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      {customIcon}
    </View>
  </TouchableHighlight>
);

ListItem.propTypes = {
  text: PropTypes.string,
  customIcon: PropTypes.element,
  onPress: PropTypes.func,
};

export default ListItem;
