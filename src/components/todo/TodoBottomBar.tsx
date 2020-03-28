import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Icon } from '@ui-kitten/components';

export interface Props {
  deleteTodo: () => void;
}

export const TodoBottomBar = (props): React.ReactElement => {
  const { deleteTodo } = props;

  const TrashIcon = () => (
    <Icon width={25} height={25} fill={'#808080'} name="trash-2-outline" />
  );

  return (
    <Layout style={styles.container} level="2">
      <Button
        style={styles.deleteButton}
        appearance="ghost"
        icon={TrashIcon}
        onPress={deleteTodo}
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
