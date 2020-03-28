import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from '@ui-kitten/components';
import { MemoList as MemoListType } from '../../screens/memo/MemoListScreen';
import CardItem from '../../elements/CardItem';

export interface Props {
  memoList: MemoListType;
  navigation: any;
}

export const MemoList = (props: Props): React.ReactElement => {
  const todoItem = ({ item }) => {
    return (
      <CardItem
        memo={item}
        style={styles.card}
        onPress={() => {
          props.navigation.push('MemoDetailScreen', { memo: item });
        }}
      />
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
    paddingVertical: 10,
    backgroundColor: '#E7EAF3'
  },
  list: {
    backgroundColor: '#E7EAF3'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxHeight: 550,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3 // Android用Shadow
  }
});

export default MemoList;
