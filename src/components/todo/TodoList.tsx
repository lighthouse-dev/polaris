import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { List, Layout, Text, Icon } from '@ui-kitten/components';
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
        <Layout style={styles.todoDetailLayout}>
          <TouchableHighlight
            onPress={() => {
              props.navigation.push('TodoDetailScreen', { todo: item });
            }}
            underlayColor="#FFF"
          >
            <Layout style={styles.todoTitleLayout}>
              <Layout style={styles.todoTitle}>
                <Text style={styles.todoTitleText}>
                  {/* convertText() 共通化 */}
                  {convertTodoTitle(item.title)}
                </Text>
              </Layout>
              <Layout style={styles.todoArrowIconLayout}>
                <Icon
                  name="chevron-right"
                  width={24}
                  height={24}
                  fill="#696969"
                  style={styles.todoArrowIcon}
                />
              </Layout>
            </Layout>
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
    width: '100%'
  },
  list: {
    backgroundColor: '#E7EAF3'
  },
  todoDate: {
    fontSize: 12,
    color: '#a2a2a2'
  },
  todoItemLayout: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1
  },
  checkBoxLayout: {
    flex: 0.1
  },
  todoDetailLayout: {
    flex: 1
  },
  todoTitleLayout: {
    flexDirection: 'row'
  },
  todoTitle: {
    flex: 1
  },
  todoTitleText: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 14
  },
  todoCheckBox: {
    marginVertical: 8,
    marginLeft: 8
  },
  todoArrowIconLayout: {
    flex: 0.1
  },
  todoArrowIcon: {
    marginVertical: 8
  }
});

export default TodoList;
