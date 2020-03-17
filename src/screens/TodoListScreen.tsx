import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Layout } from '@ui-kitten/components';
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

// TODO: ↓の書き方に修正
// export const KeyboardAvoidingView = (props): React.ReactElement => {
class TodoListScreen extends React.Component {
  state = {
    todoList: [],
    isVisible: false
  };

  // MemoListScreenコンポーネントがマウント（表示)される前に実行
  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`groups/${currentUser.uid}:default/tasks`).onSnapshot(
      snapshot => {
        const tempTodoList = [];

        snapshot.forEach(doc => {
          tempTodoList.push({ key: doc.id, ...doc.data() });
        });

        this.setState({ todoList: tempTodoList });
      }
    );
  }

  openAddTaskModal() {
    this.setState({ isVisible: true });
  }

  addTask() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 60}
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Layout style={styles.container}>
          <TodoList
            todoList={this.state.todoList}
            navigation={this.props.navigation}
          />
          {this.state.isVisible ? (
            <AddTask onPress={this.addTask.bind(this)} />
          ) : (
            <CircleButton
              name="plus"
              onPress={this.openAddTaskModal.bind(this)}
            />
          )}
        </Layout>
      </KeyboardAvoidingView>
    );
  }
}

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
