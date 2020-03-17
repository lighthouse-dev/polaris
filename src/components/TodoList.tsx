import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, CheckBox } from '@ui-kitten/components';

export interface TodoListProps {
  todoList: [];
}

export const TodoList = (props: TodoListProps): React.ReactElement => {
  const todoItem = ({ item }) => {
    // TODO: 未実装
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
  };

  return (
    <View style={styles.container}>
      <List style={styles.list} data={props.todoList} renderItem={todoItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  list: {
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
