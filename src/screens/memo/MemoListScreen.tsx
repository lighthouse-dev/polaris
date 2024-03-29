import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { getMemoList } from '../../utils/firebase';

import CircleButton from '../../elements/CircleButton';
import { MemoList } from '../../components/memo/MemoList';

export type MemoList = Memo[];

export type Memo = {
  key?: string;
  index?: number;
  title: string;
  content: string;
  tag: [];
  creator: string;
  create_date: Date;
  updater: string;
  update_date: Date;
};

export const MemoListScreen = (props): React.ReactElement => {
  const [memoList, setMemoList] = React.useState<MemoList | []>([]);

  useEffect(() => {
    getMemoList(setMemoList);
  }, []);

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
    backgroundColor: '#E7EAF3'
  },
  card: {
    marginVertical: 10
  }
});

export default MemoListScreen;
