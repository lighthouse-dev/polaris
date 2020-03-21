import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardHeader, Text } from '@ui-kitten/components';
import { MemoList as MemoListType } from '../screens/MemoListScreen';

export interface MemoListProps {
  memoList: MemoListType;
}

export const MemoList = (props: MemoListProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      {props.memoList.map(memo => {
        const Header = () => <CardHeader title={memo.title} />;
        return (
          <Card style={styles.card} header={Header} key={memo.key}>
            <Text>{memo.content} ...</Text>
            <View>
              <Text>{memo.tag}</Text>
            </View>
          </Card>
        );
      })}
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
  card: {
    marginVertical: 10
  }
});

export default MemoList;
