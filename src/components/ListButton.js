import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import styles from './styles/ListButton.styles';

const ListButton = ({ isBold, onPress, title }) => {
  const {
    buttonStyle,
    buttonTextStyle,
  } = styles;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={[buttonTextStyle, isBold && {fontWeight: 'bold'}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ListButton;