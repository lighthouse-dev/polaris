import React from 'react';
import { StyleSheet, View } from 'react-native';

import TextInputItem from '../../elements/TextInputItem';
import { Todo } from '../../screens/todo/TodoListScreen';

export interface Props {
  todo: Todo;
  setTodo: (todo: Todo) => void;
  setIsEditDetail: (flag: boolean) => void;
}

export const EditTodoDetail = (props: Props): React.ReactElement => {
  const { todo, setTodo, setIsEditDetail } = props;

  return (
    <View style={styles.container}>
      <TextInputItem
        style={styles.inputItem}
        value={todo?.detail}
        textAlignVertical="top"
        multiline={true}
        autoFocus={true}
        onBlur={() => {
          setIsEditDetail(false);
        }}
        onChangeText={(text) => {
          setTodo({ ...todo, detail: text });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 400,
  },
  inputItem: {
    flex: 1,
  },
});

export default EditTodoDetail;
