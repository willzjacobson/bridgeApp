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
  card: {
    flex: 1,
    height: '100%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '$border',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});
