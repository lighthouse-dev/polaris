import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from '@ui-kitten/components';
import { MemoList as MemoListType } from '../screens/MemoListScreen';
import CardItem from '../elements/CardItem';

export interface MemoListProps {
  memoList: MemoListType;
}

export const MemoList = (props: MemoListProps): React.ReactElement => {
  const todoItem = ({ item }) => {
    return <CardItem memo={item} style={styles.card} />;
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
