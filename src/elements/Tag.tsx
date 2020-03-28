import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Text } from '@ui-kitten/components';

export interface Props {
  key: number;
  text: string;
  style: StyleProp<ViewStyle>;
}

const Tag = (props: Props) => {
  const { text, style } = props;

  return (
    <Text category="label" style={style}>
      {text}
    </Text>
  );
};

export default Tag;
