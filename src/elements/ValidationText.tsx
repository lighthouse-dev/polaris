import React from 'react';
import { View, Text } from 'react-native';

const ValidationText = props => {
  const { messege, style } = props;

  return (
    <View>
      <Text style={style}>{messege}</Text>
    </View>
  );
};

export default ValidationText;
