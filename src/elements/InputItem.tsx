import React, { LegacyRef, Dispatch, SetStateAction } from 'react';
import { TextInput, StyleProp, ViewStyle } from 'react-native';
import { Input } from '@ui-kitten/components';

interface InputProps {
  value: string;
  setText: Dispatch<SetStateAction<string>>;
  style: StyleProp<ViewStyle>;
  placeholder?: string;
}

const InputItem = React.forwardRef(
  (props: InputProps, ref: LegacyRef<TextInput>) => {
    const { value, setText, style, placeholder } = props;

    return (
      <Input
        ref={ref}
        style={style}
        placeholder={placeholder}
        value={value}
        onChangeText={setText}
      />
    );
  }
);

export default InputItem;
