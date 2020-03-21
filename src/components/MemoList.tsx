import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardHeader, Text, List } from '@ui-kitten/components';
import { MemoList as MemoListType } from '../screens/MemoListScreen';

export interface MemoListProps {
  memoList: MemoListType;
}

export const MemoList = (props: MemoListProps): React.ReactElement => {
  const todoItem = ({ item }) => {
    const Header = () => <CardHeader title={item.title} />;
    return (
      <Card style={styles.card} header={Header} key={item.index}>
        <Text>{item.content.substring(0, 120)} ...</Text>
        <View>
          {/* TODO: Tag表示できるように対応 */}
          <Text>{item.tag}</Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <List style={styles.list} data={props.memoList} renderItem={todoItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 5,
    backgroundColor: '#FFF'
  },
  list: {
    backgroundColor: '#fff'
  },
  card: {
    marginVertical: 10,
    maxHeight: 550
  }
});

export default MemoList;
