import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, CheckBox } from '@ui-kitten/components';

class TodoList extends React.Component {
  todoItem({ item }) {
    const onCheckedChange = isChecked => {
      item.completed = !!item.completed;
    };
    return (
      <CheckBox
        text={item.title.substring(0, 20)}
        checked={item.completed}
        onChange={onCheckedChange}
        style={styles.checkbox}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          style={{ backgroundColor: '#fff' }}
          data={this.props.todoList}
          renderItem={this.todoItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  checkbox: {
    margin: 8
  },
  todoDate: {
    fontSize: 12,
    color: '#a2a2a2'
  }
});

export default TodoList;
