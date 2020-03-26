import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from '@ui-kitten/components';
import { TodoList as TodoListType } from '../../screens/todo/TodoListScreen';
import CheckBoxItem from '../../elements/CheckBoxItem';

export interface TodoListProps {
  todoList: TodoListType;
  onPress: (key: string, checked: boolean) => void;
}

export const TodoList = (props: TodoListProps): React.ReactElement => {
  const { onPress } = props;

  const todoItem = ({ item }) => {
    return (
      <CheckBoxItem
        text={item.title.substring(0, 20)}
        checked={item.completed}
        onChange={(checked: boolean) => {
          onPress(item.key, checked);
        }}
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
  todoDate: {
    fontSize: 12,
    color: '#a2a2a2'
  }
});

export default TodoList;
