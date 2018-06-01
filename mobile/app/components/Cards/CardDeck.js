import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import Card from './Card';

import styles from './styles';

const CardDeck = props => (
  <View style={styles.cardContainer}>
    <Swiper
      cards={props.questions}
      renderCard={card => <Card card={JSON.stringify(card)} />}
      onSwiped={cardIndex => {
        console.log(cardIndex);
      }}
      onSwipedAll={() => {
        console.log('onSwipedAll');
      }}
      cardStyle={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 'auto',
        height: 'auto',
      }}
      cardIndex={0}
      backgroundColor="white"
      stackSize={3}
    />
  </View>
);

CardDeck.propTypes = {
  questions: PropTypes.array,
};

export default CardDeck;
