import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import Card from './Card';

import styles from './styles';

const CardDeck = props => {
  if (Array.isArray(props.questions) && !props.questions.length) {
    return <Text>No questions for you right now :)</Text>;
  }

  return (
    <View style={styles.cardContainer}>
      <Swiper
        cards={props.questions}
        renderCard={question => (
          <Card
            sendCardToBack={this.sendCardToBack}
            submitQuestion={props.submitQuestion}
            submittingQuestion={props.submittingQuestion}
            question={question}
          />
        )}
        onSwiped={cardIndex => {
          props.sendCardToBack(cardIndex);
        }}
        horizontalSwipe={props.questions.length > 1}
        verticalSwipe={props.questions.length > 1}
        cardStyle={styles.cardStyle}
        cardIndex={0}
        backgroundColor="white"
        stackSize={3}
      />
    </View>
  );
};

CardDeck.propTypes = {
  questions: PropTypes.array,
  submittingQuestion: PropTypes.bool,
  sendCardToBack: PropTypes.func,
  submitQuestion: PropTypes.func,
};

export default CardDeck;
