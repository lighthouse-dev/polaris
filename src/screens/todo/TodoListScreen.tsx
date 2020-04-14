import React, { useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Layout } from '@ui-kitten/components';
import {
  getTodoList,
  addTodo,
  updateTodoCompleted
} from '../../utils/firebase';

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
  const [todoList, setTodoList] = React.useState<TodoList | []>([]);
  const [isVisible, setIsVisible] = React.useState(false);

  // MemoListScreenコンポーネントのマウント時に実行
  useEffect(() => {
    getTodoList(setTodoList);
  }, []);

  const openAddTodo = () => {
    setIsVisible(true);
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
          <AddTodo onPress={addTodo} setIsVisible={() => setIsVisible(false)} />
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
    backgroundColor: '#E7EAF3'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  }
});

export default TodoListScreen;
