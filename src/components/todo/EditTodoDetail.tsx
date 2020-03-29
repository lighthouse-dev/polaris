import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from '@ui-kitten/components';
import firebase from '../../utils/firebase';

import TextInputItem from '../../elements/TextInputItem';
import { Todo } from '../../screens/todo/TodoListScreen';

export interface Props {
  todo: Todo;
  setTodo: (todo: Todo) => void;
  setIsEditDetail: (flag: boolean) => void;
}

export const EditTodoDetail = (props: Props): React.ReactElement => {
  const db = firebase.firestore();
  const { currentUser } = firebase.auth();
  const { todo, setTodo, setIsEditDetail } = props;
  const todoDetailRef = React.createRef<TextInput>();

  useEffect(() => {
    todoDetailRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputLayout}>
        <TextInputItem
          ref={todoDetailRef}
          style={styles.inputItem}
          value={todo?.detail}
          textAlignVertical="top"
          multiline={true}
          onChangeText={text => {
            setTodo({ ...todo, detail: text });
          }}
        />
      </View>
      <View style={styles.buttonLayout}>
        <Button
          style={styles.cancelButton}
          status="basic"
          onPress={() => setIsEditDetail(false)}
        >
          Cancel
        </Button>
        <Button
          style={styles.saveButton}
          status="primary"
          onPress={() => {
            db.collection(`groups/${currentUser.uid}:default/todos`)
              .doc(todo.key)
              .update({ detail: todo.detail })
              .then(() => {
                setIsEditDetail(false);
              })
              .catch(err => {
                console.error(err);
              });
          }}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 180
  },
  inputLayout: {
    flex: 1
  },
  inputItem: {
    height: '100%'
  },
  buttonLayout: {
    flex: 0.1,
    flexDirection: 'row'
  },
  cancelButton: {
    margin: 8
  },
  saveButton: {
    margin: 8
  }
});

export default EditTodoDetail;
