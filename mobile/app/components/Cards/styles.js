import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '95%',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  cardStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: '$cardColor',
  },
  card: {
    flex: 1,
    height: '100%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '$border',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
