import React from 'react';
import { StyleProp, ViewStyle, TextInput } from 'react-native';

interface Props {
  value: string;
  style: StyleProp<ViewStyle>;
  placeholder?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  multiline?: boolean;
  autoFocus?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
}

const TextInputItem = (props: Props) => {
  const {
    value,
    style,
    placeholder,
    textAlignVertical,
    onChangeText,
    multiline,
    autoFocus,
    onBlur
  } = props;

  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      textAlignVertical={textAlignVertical}
      multiline={multiline}
      autoFocus={autoFocus}
      onBlur={onBlur}
    />
  );
};

export default TextInputItem;
