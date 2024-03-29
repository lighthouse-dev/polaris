import React, { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { updateTodoCompleted, updateTodoDetail } from '../../utils/firebase';

import { Todo } from './TodoListScreen';
import CheckBoxItem from '../../elements/CheckBoxItem';
import TodoBottomBar from '../../components/todo/TodoBottomBar';
import dateString from '../../utils/getDateString';
import EditTodoDetail from '../../components/todo/EditTodoDetail';
import CircleButton from '../../elements/CircleButton';

export const TodoDetailScreen = (props): React.ReactElement => {
  const [todo, setTodo] = React.useState<Todo>(null);
  const [isEditDetail, setIsEditDetail] = React.useState<boolean>(false);

  useEffect(() => {
    const { params } = props.navigation.state;
    setTodo(params.todo);
  }, []);

  if (!todo) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
      <Layout style={styles.titleLayout}>
        <CheckBoxItem
          checked={todo?.completed}
          style={styles.checkBox}
          onChange={(checked: boolean) =>
            updateTodoCompleted(todo.key, checked).then(() => {
              setTodo({ ...todo, completed: checked });
            })
          }
        />
        <Text category="h6" style={styles.title}>
          {todo?.title}
        </Text>
      </Layout>

      <ScrollView>
        {/* TODO: タグ機能実装 */}
        <Layout style={styles.commonLayout}>
          <Icon
            name="bookmark"
            width={24}
            height={24}
            fill="#FF7E6D"
            style={{ marginRight: 10 }}
          />
          {todo?.tag?.length ? null : ( // TODO: tag表示する
            <Text category="s1" style={styles.detail}>
              {'Please input a tag'}
            </Text>
          )}
        </Layout>

        {/* TODO: 指定日入力できるようにする Calender */}
        <Layout style={styles.commonLayout}>
          <Icon
            name="calendar"
            width={24}
            height={24}
            fill="#3F52B5"
            style={{ marginRight: 10 }}
          />
          <Text category="s1" style={styles.detail}>
            {todo?.deadline
              ? 'By ' + dateString(todo.deadline)
              : 'Please set an expiration date'}
          </Text>
        </Layout>

        {/* TODO: MEMO入力できるようにする */}
        <TouchableHighlight
          onPress={() => setIsEditDetail(true)}
          underlayColor="#FFF"
        >
          <Layout style={styles.detailLayout}>
            {!isEditDetail ? (
              <Text category="s1" style={styles.detail}>
                {todo?.detail ? todo.detail : 'Please input a memo'}
              </Text>
            ) : (
              <EditTodoDetail
                todo={todo}
                setTodo={setTodo}
                setIsEditDetail={setIsEditDetail}
              />
            )}
          </Layout>
        </TouchableHighlight>
      </ScrollView>

      {!isEditDetail ? (
        <TodoBottomBar todoKey={todo.key} navigation={props.navigation} />
      ) : (
        <CircleButton
          iconName="checkmark-outline"
          onPress={() =>
            updateTodoDetail(todo.key, todo).then(() => {
              setIsEditDetail(false);
            })
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAF3'
  },
  titleLayout: {
    flexDirection: 'row',
    backgroundColor: '#E7EAF3',
    minHeight: 50,
    padding: 16
  },
  checkBox: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  },
  title: {
    marginVertical: 5,
    marginRight: 5,
    color: '#555555'
  },
  commonLayout: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3 // Android用Shadow
  },
  detailLayout: {
    minHeight: 200,
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3 // Android用Shadow
  },
  detail: {
    color: '#696969'
  }
});

export default TodoDetailScreen;
