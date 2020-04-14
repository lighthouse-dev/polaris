import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { initFirebase } from '../../utils/firebase';

import { Memo } from './MemoListScreen';
import { returnMemo } from './MemoEditScreen';
import { MemoBottomBar } from '../../components/memo/MemoBottomBar';
import dateString from '../../utils/getDateString';

export const MemoDetailScreen = (props): React.ReactElement => {
  const [memo, setMemo] = React.useState<Memo>();
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [createDate, setCreateDate] = React.useState<any>(null);

  useEffect(() => {
    const { params } = props.navigation.state;
    setTitle(params.memo.title);
    setBody(params.memo.content);
    setCreateDate(params.memo.create_date);
    setMemo(params.memo);
  }, []);

  const returnMemo = (memo: returnMemo) => {
    // TODO: 詳細 → 編集 → 詳細 → 編集にくるとデータ一致しない問題発生
    // Memoの形にしてsetMemoする必要がありそう
    setTitle(memo.title);
    setBody(memo.content);
    setCreateDate(memo.createDate);
  };

  const editMemo = () => {
    props.navigation.navigate('MemoEditScreen', {
      memo: props.navigation.state.params.memo,
      returnMemo: returnMemo.bind(memo)
    });
  };

  const deleteMemo = () => {
    const { currentUser } = initFirebase.auth();
    initFirebase
      .firestore()
      .collection(`groups/${currentUser.uid}:default/memos`)
      .doc(memo.key)
      .delete()
      .then(() => {
        props.navigation.goBack();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.memoHeader}>
        <Text category="h3">{title ? title.substring(0, 10) : ''}</Text>
        <Text category="c2">{dateString(createDate)}</Text>
      </Layout>
      <ScrollView>
        <Layout style={styles.memoContent}>
          <Text style={styles.memoBody}>{body}</Text>
        </Layout>
      </ScrollView>
      <MemoBottomBar editMemo={editMemo} deleteMemo={deleteMemo} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoHeader: {
    maxHeight: 200,
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  memoContent: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 80,
    paddingLeft: 16,
    paddingRight: 16
  },
  memoBody: {
    fontSize: 15,
    lineHeight: 25
  }
});

export default MemoDetailScreen;
