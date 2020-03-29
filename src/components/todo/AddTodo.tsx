import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Icon, Input } from '@ui-kitten/components';

export interface AddTodoProps {
  onPress: (title: string) => void;
}

export const AddTodo = (props: AddTodoProps): React.ReactElement => {
  const { onPress } = props;
  const [title, setTitle] = React.useState<string>();
  const StarIcon = style => <Icon {...style} name="plus" />;

  return (
    // TODO: 入力欄以外のところをタップすると、　入力欄を隠す
    <View style={styles.container}>
      <Layout level="3" style={styles.modal}>
        {/* TODO: 期限日を指定できるようにする（カレンダー） */}
        <Input
          style={styles.todoInput}
          placeholder={'News Task'}
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        <Button
          style={styles.addTodoButton}
          status="primary"
          icon={StarIcon}
          onPress={() => {
            onPress(title);
          }}
          disabled={!title?.length ? true : false}
        />
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  modal: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 10
  },
  todoInput: {
    marginLeft: '4%',
    width: '80%'
  },
  addTodoButton: {
    marginLeft: '2%',
    marginRight: '4%',
    width: '10%',
    height: 10
  }
});

export default AddTodo;
