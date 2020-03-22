import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';
import TextInputItem from '../elements/TextInputItem';

export type returnMemo = {
  key: string;
  title: string;
  content: string;
  createDate: firebase.firestore.Timestamp;
};

export const MemoEditScreen = (props): React.ReactElement => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [key, setKey] = React.useState<string>('');

  useEffect(() => {
    const { params } = props.navigation.state;
    setKey(params.memo.key);
    setTitle(params.memo.title);
    setBody(params.memo.content);
  }, []);

  const editMemo = () => {
    // TODO
    // 1. tag機能実装
    // 2. 他の項目もちゃんと入るようにする
    const { currentUser } = firebase.auth();
    firebase
      .firestore()
      .collection(`groups/${currentUser.uid}:default/memos`)
      .doc(key)
      .update({
        content: body,
        title: title,
        updater: currentUser.uid,
        update_date: new Date()
      })
      .then(() => {
        const returnMemo: returnMemo = {
          key: key,
          title: title,
          content: body,
          createDate: firebase.firestore.Timestamp.now()
          // returnMemo に渡すので new Date() ではなくて firestore の Timestamp 型を直接使う
        };
        props.navigation.state.params.returnMemo(returnMemo);
        props.navigation.goBack();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    // TODO: ScrollViewに修正
    <Layout style={styles.container}>
      <TextInputItem
        style={styles.memoTitleInput}
        value={title}
        onChangeText={text => setTitle(text)}
        textAlignVertical="center"
        placeholder="タイトル"
      />
      <TextInputItem
        style={styles.memoEditInput}
        value={body}
        onChangeText={text => setBody(text)}
        textAlignVertical="top"
        multiline={true}
        placeholder="メモを入力してください"
      />
      <CircleButton iconName="checkmark-outline" onPress={editMemo} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoTitleInput: {
    backgroundColor: '#FFF',
    padding: 16,
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  memoEditInput: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16
  }
});

export default MemoEditScreen;
