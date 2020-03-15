import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

class CircleButton extends React.Component {
  render() {
    const { name, onPress } = this.props;

    return (
      <TouchableHighlight style={styles.container} underlayColor="transparent">
        <View>
          {/* <Button
            buttonStyle={styles.circleButton}
            icon={<Icon name={this.props.name} size={24} color="white" />}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={onPress}
          /> */}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24
  },
  circleButton: {
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
