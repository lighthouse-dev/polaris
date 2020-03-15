import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from '@ui-kitten/components';

const CheckBoxItem = () => {
  return <CheckBox style={styles.checkbox} status="control" text="Control" />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8
  },
  checkbox: {
    margin: 8
  },
  controlContainer: {
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#3366FF'
  }
});

export default CheckBoxItem;
