import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class ModalItem extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <Layout level="3" style={styles.modalContainer}>
        <Text>Hi! This is modal</Text>
        <Button onPress={onPress}>DISMISS</Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16
  }
});

export default ModalItem;
