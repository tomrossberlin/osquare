import {StyleSheet} from "react-native";

const flamingo = '#e25a48';
const whisper = '#eeeeee';
const nobel = '#9a9a9a';

export default StyleSheet.create({
  buttonRowStyle: {
    backgroundColor: flamingo,
    flexDirection: 'row',
    width: '100 %',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
  },
  cellStyle: {
    borderColor: flamingo,
    borderRadius: 7,
    borderWidth: 1,
    margin: 4,
    flex: 1,
  },
  listStyle: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: whisper,
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: flamingo,
  },
  infoSectionStyle: {
    padding: 8,
  },
  infoTextStyle: {
    color: nobel,
  },
  selectedCellStyle: {
    backgroundColor: 'white',
  },
});