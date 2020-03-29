import React, { LegacyRef } from 'react';
import { StyleProp, ViewStyle, TextInput } from 'react-native';

export interface Props {
  value: string;
  style: StyleProp<ViewStyle>;
  placeholder?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  multiline?: boolean;
  onChangeText: (text: string) => void;
}

const TextInputItem = React.forwardRef(
  (props: Props, ref: LegacyRef<TextInput>) => {
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
        ref={ref}
        style={style}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical={textAlignVertical}
        multiline={multiline}
      />
    );
  }
);

export default TextInputItem;
