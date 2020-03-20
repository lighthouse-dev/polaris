import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, CheckBox } from '@ui-kitten/components';
import { TodoList as TodoListType } from '../screens/TodoListScreen';

export interface TodoListProps {
  todoList: TodoListType;
  onPress: (key: string, checked: boolean) => void;
}

export const TodoList = (props: TodoListProps): React.ReactElement => {
  const { onPress } = props;

  const todoItem = ({ item }) => {
    return (
      <CheckBox
        text={item.title.substring(0, 20)}
        checked={item.completed}
        onChange={(checked: boolean) => {
          onPress(item.key, checked);
        }}
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
