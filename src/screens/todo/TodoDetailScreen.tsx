import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import firebase from '../../utils/firebase';

import { Todo } from './TodoListScreen';
import CheckBoxItem from '../../elements/CheckBoxItem';
import TodoBottomBar from '../../components/todo/TodoBottomBar';
import dateString from '../../utils/getDateString';

export const TodoDetailScreen = (props): React.ReactElement => {
  const db = firebase.firestore();
  const { currentUser } = firebase.auth();
  const [todo, setTodo] = React.useState<Todo>(null);

  useEffect(() => {
    const { params } = props.navigation.state;
    setTodo(params.todo);
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleLayout}>
        <CheckBoxItem
          checked={todo?.completed}
          style={styles.checkBox}
          onChange={(checked: boolean) => {
            db.collection(`groups/${currentUser.uid}:default/todos`)
              .doc(todo.key)
              .update({ completed: checked })
              .then(() => {
                setTodo({ ...todo, completed: checked });
              })
              .catch(err => {
                console.error(err);
              });
          }}
        />
        <Text category="h6" style={styles.title}>
          {todo?.title}
        </Text>
      </Layout>
      <ScrollView>
        <Layout style={styles.tagLayout}>
          <Icon
            name="bookmark"
            width={24}
            height={24}
            fill="#FF7E6D"
            style={{ marginRight: 10 }}
          />
          {todo?.tag?.length ? (
            ''
          ) : (
            <Text category="s1" style={styles.detail}>
              {'タグを入力してください'}
            </Text>
          )}
        </Layout>

        <Layout style={styles.dateLayout}>
          <Icon
            name="calendar"
            width={24}
            height={24}
            fill="#3F52B5"
            style={{ marginRight: 10 }}
          />
          <Text category="s1" style={styles.detail}>
            {todo?.deadline
              ? dateString(todo.deadline) + ' まで'
              : '期限日を指定'}
          </Text>
        </Layout>

        <Layout style={styles.detailLayout}>
          <Text category="s1" style={styles.detail}>
            {todo?.detail ? todo.detail : 'メモを入力してください'}
          </Text>
        </Layout>
      </ScrollView>
      <TodoBottomBar />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E7EAF3'
  },
  titleLayout: {
    flexDirection: 'row',
    minHeight: 50,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  checkBox: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5
  },
  tagLayout: {
    flexDirection: 'row',
    padding: 16,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2
  },
  dateLayout: {
    flexDirection: 'row',
    padding: 16,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2
  },
  detailLayout: {
    minHeight: 200,
    paddingTop: 30,
    paddingBottom: 80,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2
  },
  detail: {
    color: '#696969'
  }
});

export default TodoDetailScreen;
