import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { deleteTodo } from '../../utils/firebase';

export interface Props {
  todoKey: string;
  navigation: any;
}

export const TodoBottomBar = (props: Props): React.ReactElement => {
  const { todoKey } = props;

  const TrashIcon = () => (
    <Icon width={25} height={25} fill={'#808080'} name="trash-2-outline" />
  );

  return (
    <Layout style={styles.container} level="2">
      <Button
        style={styles.deleteButton}
        appearance="ghost"
        icon={TrashIcon}
        onPress={() => {
          // TODO: 確認アラートを出す
          deleteTodo(todoKey).then(() => {
            props.navigation.goBack();
          });
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    height: 60
  },
  deleteButton: {
    marginRight: 10
  }
});

export default TodoBottomBar;
