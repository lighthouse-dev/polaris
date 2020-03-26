import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../../elements/CircleButton';
import TextInputItem from '../../elements/TextInputItem';
import { Memo } from './MemoListScreen';

export const MemoAddScreen = (props): React.ReactElement => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const { currentUser } = firebase.auth();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
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
      {/* TODO: ボタンの色を修正 */}
      <CircleButton
        iconName="checkmark-outline"
        onPress={() => {
          const currentDate = new Date();

          // TODO
          // 1. tag機能実装
          // 2. 他の項目もちゃんと入るようにする
          const memo: Memo = {
            title: title,
            content: body,
            tag: '',
            creator: currentUser.uid,
            create_date: currentDate,
            updater: currentUser.uid,
            update_date: currentDate
          };

          firebase
            .firestore()
            .collection(`groups/${currentUser.uid}:default/memos`)
            .doc()
            .set(memo)
            .then(() => {
              props.navigation.goBack();
            })
            .catch(err => {
              console.error(err);
            });
        }}
      />
    </KeyboardAvoidingView>
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

export default MemoAddScreen;
