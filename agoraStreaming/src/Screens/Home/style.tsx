import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  button: TextStyle;
  buttonText: TextStyle;
  map: ViewStyle;
  calloutStyle: ViewStyle;
  itemChannel: ViewStyle;
};

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  itemChannel: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  calloutStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
