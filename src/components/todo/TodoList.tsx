import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { List, Layout, Text } from '@ui-kitten/components';
import { TodoList as TodoListType } from '../../screens/todo/TodoListScreen';
import CheckBoxItem from '../../elements/CheckBoxItem';

export interface TodoListProps {
  todoList: TodoListType;
  navigation: any;
  onPress: (key: string, checked: boolean) => void;
}

export const TodoList = (props: TodoListProps): React.ReactElement => {
  const { onPress } = props;

  const convertTodoTitle = (title: string) => {
    if (title.length > 25) {
      return title.substring(0, 25) + ' ...';
    }
    return title;
  };

  const todoItem = ({ item }) => {
    return (
      <Layout style={styles.todoItemLayout}>
        <Layout style={styles.checkBoxLayout}>
          <CheckBoxItem
            checked={item.completed}
            style={styles.todoCheckBox}
            onChange={(checked: boolean) => {
              onPress(item.key, checked);
            }}
          />
        </Layout>
        <Layout style={styles.todoTitleLayout}>
          <TouchableHighlight
            onPress={() => {
              props.navigation.push('TodoDetailScreen', { todo: item });
            }}
            underlayColor="#FFF"
          >
            <Text style={styles.todoTitle} category="p2">
              {convertTodoTitle(item.title)}
            </Text>
          </TouchableHighlight>
        </Layout>
      </Layout>
    );
  };

  return (
    <Layout style={styles.container}>
      <List style={styles.list} data={props.todoList} renderItem={todoItem} />
    </Layout>
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
  },
  todoItemLayout: {
    flexDirection: 'row'
  },
  checkBoxLayout: {
    flex: 0.1
  },
  todoTitleLayout: {
    flex: 1
  },
  todoTitle: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 5,
    paddingRight: 5
  },
  todoCheckBox: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8
  }
});

export default TodoList;
