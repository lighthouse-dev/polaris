import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

export interface CheckBoxProps {
  text?: string;
  checked: boolean;
  style: StyleProp<ViewStyle>;
  onChange: (checked: boolean) => void;
}

const CheckBoxItem = (props: CheckBoxProps) => {
  const { text, checked, style, onChange } = props;

  return (
    <CheckBox text={text} checked={checked} onChange={onChange} style={style} />
  );
};

export default CheckBoxItem;
