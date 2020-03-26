import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { Memo } from './MemoListScreen';
import { returnMemo } from './MemoEditScreen';
import { MemoBottomBar } from '../components/MemoBottomBar';

export const MemoDetailScreen = (props): React.ReactElement => {
  const [memo, setMemo] = React.useState<Memo>();
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [createDate, setCreateDate] = React.useState<
    firebase.firestore.Timestamp
  >(null);

  useEffect(() => {
    const { params } = props.navigation.state;
    setTitle(params.memo.title);
    setBody(params.memo.content);
    setCreateDate(params.memo.create_date);
  }, []);

  const dateString = date => {
    if (date == null) {
      return '';
    }

    return date
      .toDate()
      .toISOString()
      .split('T')[0];
  };

  const returnMemo = (memo: returnMemo) => {
    // TODO: 詳細 → 編集 → 詳細 → 編集にくるとデータ一致しない問題発生
    // Memoの形にしてsetMemoする必要がありそう
    setTitle(memo.title);
    setBody(memo.content);
    setCreateDate(memo.createDate);
  };

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.memoHeader}>
          <Text category="h2">{title ? title.substring(0, 10) : ''}</Text>
          <Text category="c2">{dateString(createDate)}</Text>
        </Layout>

        <Layout style={styles.memoContent}>
          <Text style={styles.memoBody}>{body}</Text>
        </Layout>
      </ScrollView>
      <MemoBottomBar
        onPress={() => {
          props.navigation.navigate('MemoEditScreen', {
            memo: props.navigation.state.params.memo,
            returnMemo: returnMemo.bind(memo)
          });
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoHeader: {
    height: 100,
    justifyContent: 'center',
    padding: 16,
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  memoContent: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 80,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16
  },
  memoBody: {
    fontSize: 15,
    lineHeight: 25
  }
});

export default MemoDetailScreen;
