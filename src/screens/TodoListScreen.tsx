import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { Modal } from '@ui-kitten/components';
import TodoList from '../components/TodoList';
import CircleButton from '../../src/elements/CircleButton';
import ModalItem from '../../src/elements/ModalItem';
// import { Button, Input, Overlay } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

const dateString = date => {
  if (date == null) {
    return '';
  }

  return date
    .toDate()
    .toISOString()
    .split('T')[0];
};

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
      <View style={styles.container}>
        <TodoList
          todoList={this.state.todoList}
          navigation={this.props.navigation}
        />
        <CircleButton name="plus" onPress={this.openAddTaskModal.bind(this)} />
        <Modal visible={this.state.isVisible}>
          <ModalItem onPress={this.addTask.bind(this)} />
        </Modal>
        {/* <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => {
            this.setState({ isVisible: false });
          }}
          overlayStyle={{
            height: 100,
            width: '100%',
            position: 'absolute',
            bottom: 0
          }}
        >
          <Input
            placeholder="Input Task"
            leftIcon={<Icon name="check" size={24} color="green" />}
            inputContainerStyle={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '80%'
            }}
          />
          <Button
            buttonStyle={styles.addBtn}
            icon={<Icon name="check" size={24} color="white" />}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={() => {
              alert(1);
            }}
          />
        </Overlay> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 6,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 24,
    fontWeight: 'bold'
  },
  addBtn: {
    display: 'flex',
    alignItems: 'flex-end',
    width: 40
  }
});

export default TodoListScreen;
