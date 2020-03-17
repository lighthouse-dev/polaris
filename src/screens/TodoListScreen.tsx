import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Layout } from '@ui-kitten/components';
import { useNavigation } from 'react-navigation-hooks';
import firebase from 'firebase';

import TodoList from '../components/TodoList';
import CircleButton from '../../src/elements/CircleButton';
import AddTask from '../components/AddTask';

type Task = {
  title: string; // "内容",
  detail: string; // "詳細",
  completed: boolean; // false,
  priority: number; // 1,
  person: string; // "julee",
  deadline: Date; //'2020-01-30',
  creator: string; //"julee",
  create_date: Date; // '2019-12-01',
  updater: string; //"soojin",
  update_date: Date; //'2019-12-01',
};

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
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

  // MemoListScreenコンポーネントのマウント時に実行
  useEffect(() => {
    // TODO: 日付でsort
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

  const addTask = (title: string) => {
    const currentDate = new Date();
    const data: Task = {
      title: title,
      detail: '詳細',
      completed: false,
      priority: 1,
      person: 'julee',
      deadline: currentDate,
      creator: 'julee',
      create_date: currentDate,
      updater: 'soojin',
      update_date: currentDate
    };

    db.collection(`groups/${currentUser.uid}:default/tasks`)
      .doc()
      .set(data)
      .then(() => {
        setIsVisible(false);
      });
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
          <AddTask onPress={addTask} />
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
