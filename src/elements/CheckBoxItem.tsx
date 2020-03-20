import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

export interface CheckBoxProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBoxItem = (props: CheckBoxProps) => {
  const { text, checked, onChange } = props;

  return (
    <CheckBox
      text={text}
      checked={checked}
      onChange={onChange}
      style={styles.checkbox}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    margin: 8
  }
});

export default CheckBoxItem;
