import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class TodoListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> TODO LIST </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  }
});

export default TodoListScreen;
