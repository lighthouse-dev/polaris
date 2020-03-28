import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Layout } from '@ui-kitten/components';
import firebase from '../../utils/firebase';

import TodoList from '../../components/todo/TodoList';
import CircleButton from '../../elements/CircleButton';
import AddTodo from '../../components/todo/AddTodo';

export type TodoList = Todo[];

export type Todo = {
  key?: string;
  title: string; // "内容",
  detail: string; // "詳細",
  completed: boolean; // false,
  tag: [];
  priority: number; // 1,
  person: string; // "julee",
  deadline: Date | null; //'2020-01-30',
  creator: string; //"julee",
  create_date: Date; // '2019-12-01',
  updater: string; //"soojin",
  update_date: Date; //'2019-12-01',
};

export const TodoListScreen = (props): React.ReactElement => {
  const db = firebase.firestore();
  const { currentUser } = firebase.auth();
  const [todoList, setTodoList] = React.useState<TodoList | []>([]);
  const [isVisible, setIsVisible] = React.useState(false);

  // MemoListScreenコンポーネントのマウント時に実行
  useEffect(() => {
    getTodoList();
  }, []);

  const openAddTodo = () => {
    setIsVisible(true);
  };

  const getTodoList = () => {
    // TODO: 日付でsort
    db.collection(`groups/${currentUser.uid}:default/todos`)
      .where('completed', '==', false)
      .onSnapshot(
        snapshot => {
          const tempTodoList: TodoList = [];

          snapshot.forEach(doc => {
            tempTodoList.push({ key: doc.id, ...doc.data() } as Todo);
          });

          setTodoList(tempTodoList);
        },
        err => {
          console.error(`getTodoList:-  ${err}`);
        }
      );
  };

  const addTodo = (title: string) => {
    const currentDate = new Date();
    // TODO: title以外の情報もちゃんと入るようにする
    const data: Todo = {
      title: title,
      detail: null,
      completed: false,
      tag: [],
      priority: 1,
      person: 'julee',
      deadline: currentDate,
      creator: currentUser.uid,
      create_date: currentDate,
      updater: currentUser.uid,
      update_date: currentDate
    };

    // TODO: firebase関連処理を一つのファイル（utils?）にまとめる
    db.collection(`groups/${currentUser.uid}:default/todos`)
      .doc()
      .set(data)
      .then(() => {
        setIsVisible(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const updateTodoCompleted = (key: string, checked: boolean) => {
    db.collection(`groups/${currentUser.uid}:default/todos`)
      .doc(key)
      .update({ completed: checked })
      .then(() => {})
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 60}
      style={{ flex: 1 }}
      behavior="padding"
    >
      <Layout style={styles.container}>
        <TodoList
          todoList={todoList}
          navigation={props.navigation}
          onPress={updateTodoCompleted}
        />
        {/* TODO: 完了になったタスクをどう表示させるか？ */}
        {/* TODO: 「完了したタスクを隠す」 的なフラグを作る など */}
        {isVisible ? (
          <AddTodo onPress={addTodo} />
        ) : (
          // TODO: ボタン押した時、入力欄にカーソルが当たった状態にする
          <CircleButton iconName="plus" onPress={openAddTodo} />
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
