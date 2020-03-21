import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Button, Icon, Layout } from '@ui-kitten/components';

export interface CircleButtonProps {
  iconName: string;
  onPress: () => void;
}
const CircleButton = (props: CircleButtonProps) => {
  const { iconName, onPress } = props;
  const StarIcon = style => <Icon {...style} name={iconName} />;

  return (
    <TouchableHighlight style={styles.container} underlayColor="transparent">
      <Layout>
        <Button
          style={styles.button}
          status="danger"
          icon={StarIcon}
          onPress={onPress}
        />
      </Layout>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24
  },
  button: {
    backgroundColor: '#FF4181',
    borderRadius: 50,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48
  }
});

export default CircleButton;
