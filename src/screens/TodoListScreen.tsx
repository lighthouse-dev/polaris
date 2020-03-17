import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Layout } from '@ui-kitten/components';
import { useNavigation } from 'react-navigation-hooks';
import firebase from 'firebase';

import TodoList from '../components/TodoList';
import CircleButton from '../../src/elements/CircleButton';
import AddTask from '../components/AddTask';

// TODO: 必要なければ消す
const dateString = date => {
  if (date == null) {
    return '';
  }

  return date
    .toDate()
    .toISOString()
    .split('T')[0];
};

export const TodoListScreen = (): React.ReactElement => {
  const { navigate } = useNavigation();
  const [todoList, setTodoList] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);

  // MemoListScreenコンポーネントのマウント時に実行
  useEffect(() => {
    // Your code here
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`groups/${currentUser.uid}:default/tasks`).onSnapshot(
      snapshot => {
        const tempTodoList = [];

        snapshot.forEach(doc => {
          tempTodoList.push({ key: doc.id, ...doc.data() });
        });

        setTodoList(tempTodoList);
      }
    );
  }, []);

  const openAddTask = () => {
    setIsVisible(true);
  };

  const closeAddTask = () => {
    setIsVisible(false);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 60}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <Layout style={styles.container}>
        <TodoList todoList={todoList} navigation={navigate} />
        {isVisible ? (
          <AddTask onPress={closeAddTask} />
        ) : (
          <CircleButton name="plus" onPress={openAddTask} />
        )}
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
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
