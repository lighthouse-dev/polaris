import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import firebase from 'firebase';

import CircleButton from '../../src/elements/CircleButton';
import { MemoList } from '../components/MemoList';

export type MemoList = Memo[];

export type Memo = {
  key?: string;
  index?: number;
  title: string;
  content: string;
  tag: string;
  creator: string;
  create_date: Date;
  updater: string;
  update_date: Date;
};

export const MemoListScreen = (props): React.ReactElement => {
  const [memoList, setMemoList] = React.useState<MemoList | []>([]);

  useEffect(() => {
    getMemoList();
  }, []);

  const getMemoList = () => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`groups/${currentUser.uid}:default/memos`).onSnapshot(
      snapshot => {
        const tempMemoList: MemoList = [];

        snapshot.forEach(doc => {
          tempMemoList.push({ key: doc.id, ...doc.data() } as Memo);
        });

        setMemoList(tempMemoList);
      },
      err => {
        console.error(`getMemoList:-  ${err}`);
      }
    );
  };

  return (
    <Layout style={styles.container}>
      {/* TODO: 検索欄実装 */}
      <MemoList memoList={memoList} navigation={props.navigation} />
      <CircleButton
        iconName="edit-outline"
        onPress={() => {
          props.navigation.push('MemoAddScreen');
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFF'
  },
  card: {
    marginVertical: 10
  }
});

export default MemoListScreen;
