import {StyleSheet} from "react-native";

const flamingo = '#e25a48';

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: flamingo,
  },
  headerStyle: {
    backgroundColor: flamingo,
    alignItems: 'center',
    margin: 8,
    marginTop: 0,
  },
  headlineStyle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeadlineStyle: {
    color: 'white',
  }
});