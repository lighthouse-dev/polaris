import React from 'react';
import { StyleProp, ViewStyle, TextInput } from 'react-native';

export interface Props {
  value: string;
  style: StyleProp<ViewStyle>;
  placeholder?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  multiline?: boolean;
  onChangeText: (text: string) => void;
}

const TextInputItem = (props: Props) => {
  const {
    value,
    style,
    placeholder,
    textAlignVertical,
    onChangeText,
    multiline
  } = props;

  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      textAlignVertical={textAlignVertical}
      multiline={multiline}
    />
  );
};

export default TextInputItem;
