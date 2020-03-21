import React from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import { Memo } from './MemoListScreen';

export const MemoAddScreen = (props): React.ReactElement => {
  const [body, setBody] = React.useState<string>('');
  const db = firebase.firestore();
  const { currentUser } = firebase.auth();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={80}
    >
      <TextInput
        style={styles.memoEditInput}
        value={body}
        multiline
        onChangeText={text => {
          setBody(text);
        }}
        textAlignVertical="top"
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
            title: body.substring(0, 10),
            content: body,
            tag: '',
            creator: currentUser.uid,
            create_date: currentDate,
            updater: currentUser.uid,
            update_date: currentDate
          };

          db.collection(`groups/${currentUser.uid}:default/memos`)
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
  memoEditInput: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16
  }
});

export default MemoAddScreen;
