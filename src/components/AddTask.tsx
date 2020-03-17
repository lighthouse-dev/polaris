import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Layout, Input, Icon } from '@ui-kitten/components';

export interface AddTaskProps {
  onPress: () => void;
}

export const AddTask = (props: AddTaskProps): React.ReactElement => {
  const StarIcon = style => <Icon {...style} name="plus" />;
  const [title, settitle] = React.useState<string>();
  const { onPress } = props;
  const { height, width } = Dimensions.get('window');

  return (
    // TODO: 入力欄以外のところをタップすると、　入力欄を隠す
    <View style={styles.container}>
      <Layout level="3" style={styles.modal}>
        <Input
          style={styles.taskInput}
          placeholder="タスクを入力してください"
          value={title}
          onChangeText={settitle}
        />
        <Button
          style={styles.addTaskButton}
          status="primary"
          icon={StarIcon}
          onPress={onPress}
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
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  taskInput: {
    marginLeft: '4%',
    width: '80%'
  },
  addTaskButton: {
    marginLeft: '2%',
    marginRight: '4%',
    width: '10%',
    height: 10
  }
});

export default AddTask;
